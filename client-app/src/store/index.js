import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../common/ApiService";
import { SnackbarProgrammatic as Snackbar } from 'buefy'

Vue.use(Vuex);

const notifyError = (code, message) => {
  Snackbar.open({type: "is-danger", message: message, position: "is-bottom"})
};

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || "0",
    latestDownload: null,
    accessToken: null,
    session: null,
    applicationErrors: [],
  },
  mutations: {
    setSession(state, { sessionId, votingOptions, token }) {
      state.accessToken = token;
      state.session = { id: sessionId, options: votingOptions };
    },
    destroySession(state) {
      state.session = null;
      state.accessToken = null;
    },
    setLatestAppDownload(state, latest) {
      state.latestDownload = latest;
    },
    setApplicationError(state, {code, message}){
      state.applicationErrors.push({code, message});
    }
  },
  actions: {
    async joinSession({ commit }, { sessionId }) {
      try {
        Vue.appInsights.trackEvent({name: "Join session", properties: {sessionId: sessionId}});

        const session = await ApiService.joinSession(sessionId);

        commit("setSession", {
          sessionId: sessionId,
          votingOptions: session.votingOptions,
          token: session.accessToken.token,
        });
      } catch (error) {
        commit("setApplicationError", {code: 0, message: error.response.data});
        notifyError(0, error.response.data);
      } finally {
        /* do nothing */
      }
    },
    async removeActiveSession({ commit, getters }) {
      try {
        Vue.appInsights.trackEvent({name: "Leave session", properties: {session: getters.activeSession}});
        await ApiService.leaveSession(getters.activeSession);

        commit("destroySession");
      } catch ({response}) {
        commit("setApplicationError", {code: 0, message: response.data});
        notifyError(0, response.data);
      } finally {
        /* do nothing */
      }
    },
    // eslint-disable-next-line no-unused-vars
    async castVote({ commit, getters }, { vote }) {
      try {
        Vue.appInsights.trackEvent({name: "Cast vote", properties: {session: getters.activeSession, vote: vote}});
        await ApiService.submitVote(vote);
      } catch ({response}) {
        commit("setApplicationError", {code: 0, message: response.data});
        notifyError(0, response.data);
      } finally {
        /* do nothing */
      }
    },
    async fetchLatestAppDownload({ commit }) {
      try {
        const app = await ApiService.getLatestAppDownload();

        commit("setLatestAppDownload", app)
      } catch ({response}) {
        commit("setApplicationError", {code: 0, message: response.data});
      } finally {
        /* do nothing */
      }
    },
  },
  getters: {
    activeSession: (state) => state.session,
    accessToken: (state) => state.accessToken,
    isAuthenticated: (state) =>
      state.accessToken != undefined && state.session != undefined,
    appVersion: (state) => state.packageVersion,
    latestDownload: (state) => state.latestDownload,
    activeErrors: (state) => state.applicationErrors
  },
  modules: {},
});
