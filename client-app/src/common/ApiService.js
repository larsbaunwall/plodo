import axios from "axios";
import store from "../store";

let cfg;

const axiosInstance = axios.create();

const fetchConfig = async () => {
  const {data} = await axios.get("/cfg.json");
  return data;
}

const ApiService = {

  init() {
    axiosInstance.interceptors.request.use(
      async config => {
        if(cfg == null)
          cfg = await fetchConfig();

        config.baseURL = cfg.baseURL;

        if (store.getters.accessToken) {
          config.headers.Authorization = `Bearer ${store.getters.accessToken}`;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  },

  async joinSession(sessionId) {
    try {
      const { data } = await axiosInstance.post(
        `sessions/${sessionId}/audience`
      );

      return { 
        votingOptions: data.votingOptions,
        accessToken: {
          token: data.accessToken.token,
          type: data.accessToken.type,
          expires: data.accessToken.expires
        }
      };
    } catch {
      /* do nothing */
    }
  },

  // eslint-disable-next-line no-unused-vars
  async leaveSession(sessionId) {},
  
  async submitVote(vote) {
    try {
      await axiosInstance.post(
        `sessions/${store.getters["activeSession"].id}/votes`,
        { vote: vote }
      );
    } catch {
      /* do nothing */
    }
  },
};

export default ApiService;
