/* eslint-disable no-param-reassign */
import axios from "axios";
import https from 'https';
import EventSource from 'eventsource';

const { apiEndpoint, apiVersion, streamEndpoint } = require(`../static/config.${process.env.NODE_ENV}.json`);

const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}/api/${apiVersion}`,
  httpsAgent: new https.Agent({ rejectUnauthorized: process.env.NODE_ENV !== "development" })
});

const api = {
  configure (store) {
    axiosInstance.interceptors.request.use(
      request => {
        if (store.getters.accessToken) {
          request.headers.Authorization = `Bearer ${store.getters.accessToken}`;
        }
        return request;
      },
      error => {
        console.log({ error });
        Promise.reject(error);
      }
    );

    store.$api = {
      axios: axiosInstance,
      connectEventStream () {
        let sse = new EventSource(streamEndpoint, { authorizationHeader: `Bearer ${store.getters.accessToken}` });

        console.log({ sse })
        sse.addEventListener("vote", msg => {
          store.dispatch("processVote", msg);
        });

        return sse;
      }
    };
  }
};

export default api;
