/* eslint-disable no-param-reassign */
import axios from "axios";
import { apiEndpoint, apiVersion } from "@/config.json";

const axiosInstance = axios.create({
  baseURL: `${apiEndpoint}/api/${apiVersion}`
});

const BackendApi = {
  install(Vue, options) {
    const { store } = options;
    axiosInstance.interceptors.request.use(
      config => {
        if (store.getters.accessToken) {
          config.headers.Authorization = `Bearer ${store.getters.accessToken}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    Vue.prototype.$api = axiosInstance;
    store.$api = axiosInstance;
  }
};

export default BackendApi;
