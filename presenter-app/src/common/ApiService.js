/* eslint-disable no-param-reassign */
import axios from "axios";
import https from "https";
import EventSource from "eventsource";
import {is, api} from "electron-util";
import store from "../store";
import { ipcMain, ipcRenderer } from "electron";

const {
  apiEndpoint,
  apiVersion,
  streamEndpoint,
} = require(`../static/config.${process.env.NODE_ENV}.json`);

const version = api.app.getVersion();

let evtSource = null;
let sseReconnectFrequencySeconds = 1;
let shouldCloseEvtSource = false;

const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}/${apiVersion}`,
  httpsAgent: new https.Agent({ rejectUnauthorized: !is.development }),
});

const ApiService = {
  init() {
    axiosInstance.interceptors.request.use(
      request => {
        request.headers["X-App-Version"] = version;
        
        if (store.getters.accessToken) {
          request.headers.Authorization = `Bearer ${store.getters.accessToken}`;
        }
        return request;
      },
      error => {
        if (is.development) console.log("Could not complete API request", { error });

        Promise.reject(error);
      }
    );

    if (process.type === "main") {
      ipcMain.on("CONNECT_EVENT_STREAM", (evt, args) => this.onConnectEventStream());
      ipcMain.on("CLOSE_EVENT_STREAM", (evt, args) => this.onCloseEventStream());
    }

    if (store.getters.activeSession.id !== "") this.connectEventStream();
  },

  /**
   * Create a new session on the server
   *
   * @param {{id}[]} votingOptions for the sessions
   * @returns {{sessionId:String, accessToken:{}}} session data
   */
  async joinSession(votingOptions) {
    const { data } = await axiosInstance.post("sessions", {
      votingOptions: votingOptions.map(x => x.id),
    });

    return data;
  },

  /**
   * Abandon a session on the server
   *
   * @param {String} sessionId
   */
  async leaveSession(sessionId) {
    await axiosInstance.delete(`sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${store.getters.accessToken}` },
    });
    this.closeEventStream();
  },

  connectEventStream() {
    if (process.type === "renderer") {
      ipcRenderer.send("CONNECT_EVENT_STREAM");
      return;
    }

    this.onConnectEventStream();
  },

  closeEventStream() {
    if (process.type === "renderer") {
      ipcRenderer.send("CLOSE_EVENT_STREAM");
      return;
    }

    this.onCloseEventStream();
  },

  onCloseEventStream() {
    shouldCloseEvtSource = true;
    if (evtSource) evtSource.close();
    store.dispatch("updateSessionStreamState", null);
    console.log("stream closed");
  },

  onConnectEventStream() {
    console.log("Connecting eventstream");
    shouldCloseEvtSource = false;
    const waitFunc = () => sseReconnectFrequencySeconds * 1000;
    const tryToSetupFunc = () => {
      if (!shouldCloseEvtSource) {
        setupEventSource();
        sseReconnectFrequencySeconds *= 2;
        if (sseReconnectFrequencySeconds >= 64) {
          sseReconnectFrequencySeconds = 64;
        }
      }
    };

    const setupEventSource = () => {
      if (evtSource) evtSource.close();

      evtSource = new EventSource(`${streamEndpoint}?access_token=${store.getters.accessToken}&appVersion=${version}`, {
        withCredentials: true,
      });

      store.dispatch("updateSessionStreamState", true);

      evtSource.addEventListener("vote", msg => {
        store.dispatch("processVote", msg);
      });

      evtSource.addEventListener("audienceJoined", msg => {
        store.dispatch("audienceJoined", msg);
      });

      evtSource.addEventListener("terminate", msg => {
        this.closeEventStream();
      });

      evtSource.onopen = e => {
        sseReconnectFrequencySeconds = 1;
        console.log("Eventstream opened", { e });
      };
      evtSource.onerror = e => {
        console.log("Eventstream error", { e });
        evtSource.close();
        store.dispatch("updateSessionStreamState", false);
        setTimeout(tryToSetupFunc, waitFunc());
      };
    };

    setupEventSource();
  },
};

export default ApiService;
