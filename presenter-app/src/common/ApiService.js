/* eslint-disable no-param-reassign */
import axios from "axios";
import https from "https";
import EventSource from "eventsource";
import store from "../store";
import { ipcMain, ipcRenderer } from "electron";

const DEBUG = process.env.NODE_ENV === "development";

const {
  apiEndpoint,
  apiVersion,
  streamEndpoint,
} = require(`../static/config.${process.env.NODE_ENV}.json`);

let evtSource = null;
let sseReconnectFrequencySeconds = 1;

const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}/${apiVersion}`,
  httpsAgent: new https.Agent({ rejectUnauthorized: process.env.NODE_ENV !== "development" }),
});

const ApiService = {
  init() {
    axiosInstance.interceptors.request.use(
      request => {
        if (store.getters.accessToken) {
          request.headers.Authorization = `Bearer ${store.getters.accessToken}`;
        }
        return request;
      },
      error => {
        if (DEBUG) console.log("Could not complete API request", { error });

        Promise.reject(error);
      }
    );

    if (process.type === "main") {
      ipcMain.on("CONNECT_EVENT_STREAM", (evt, args) => this.onConnectEventStream());
      ipcMain.on("CLOSE_EVENT_STREAM", (evt, args) => {
        if (evtSource) evtSource.close();
      });
    }

    if(store.getters.activeSession.id !== "")
      this.connectEventStream();
  },

  async joinSession(votingOptions) {
    const { data } = await axiosInstance.post("sessions", {
      votingOptions: votingOptions.map(x => x.id),
    });

    return data;
  },

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

    if (evtSource) evtSource.close();
  },

  onConnectEventStream() {
    console.log("Connecting eventstream");
    const waitFunc = () => sseReconnectFrequencySeconds * 1000;
    const tryToSetupFunc = () => {
      setupEventSource();
      sseReconnectFrequencySeconds *= 2;
      if (sseReconnectFrequencySeconds >= 64) {
        sseReconnectFrequencySeconds = 64;
      }
    };

    const setupEventSource = () => {
      if(evtSource) evtSource.close();

      evtSource = new EventSource(`${streamEndpoint}?access_token=${store.getters.accessToken}`, {
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

      evtSource.onopen = (e) => {
        sseReconnectFrequencySeconds = 1;
        console.log("Eventstream opened", {e});
      };
      evtSource.onerror = (e) => {
        console.log("Eventstream error", {e});
        evtSource.close();
        store.dispatch("updateSessionStreamState", false);
        setTimeout(tryToSetupFunc, waitFunc());
      };
    };

    setupEventSource();
  },
};

export default ApiService;
