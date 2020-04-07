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

let sse = null;

const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}/api/${apiVersion}`,
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

    if(process.type === "main"){
      ipcMain.on("CONNECT_EVENT_STREAM", (evt, args) => this.onConnectEventStream());
    }
  },

  async joinSession(votingOptions) {
    const { data } = await axiosInstance.post("sessions", {
      votingOptions: votingOptions.map(x => x.id),
    });

    return data;
  },

  async leaveSession(sessionId) {
    await axiosInstance.delete(`sessions/${sessionId}`, {headers: {Authorization: `Bearer ${store.getters.accessToken}`}});
    if(sse) sse.close();
    console.log("Eventstream disconnected");
  },

  connectEventStream() {
    if(process.type === "renderer"){
      ipcRenderer.send("CONNECT_EVENT_STREAM");
      return;
    }

    this.onConnectEventStream();
  },

  onConnectEventStream() {
    console.log("Connecting eventstream");
    sse = new EventSource(`${streamEndpoint}?access_token=${store.getters.accessToken}`, {
      withCredentials: true,
    });

    sse.addEventListener("vote", msg => {
      store.dispatch("processVote", msg);
    });

    sse.addEventListener("terminate", msg => {
      console.log("Session terminated on server");
      if(sse) sse.close();
      console.log("Eventstream disconnected");
    });
  }
};

export default ApiService;
