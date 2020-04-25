import Vue from "vue";
import Vuex from "vuex";
import ApiService from "../common/ApiService";
import { SnackbarProgrammatic as Snackbar } from 'buefy'

Vue.use(Vuex);

const notifyError = (code, message) => {
  if(message && message !== "")
    Snackbar.open({type: "is-danger", message: message, position: "is-bottom"});
  else
    Snackbar.open({type: "is-danger", message: "An error occured processing your request. Please try again.", position: "is-bottom"});
};

export default new Vuex.Store({
  state: {
    packageVersion: process.env.PACKAGE_VERSION || "0",
    latestDownload: null,
    accessToken: null,
    session: null,
  },
  mutations: {
    setSession(state, { sessionId, votingOptions, token, userId }) {
      state.accessToken = token;
      state.session = { id: sessionId, options: votingOptions, userId: userId };
    },
    destroySession(state) {
      state.session = null;
      state.accessToken = null;
    },
    setLatestAppDownload(state, latest) {
      state.latestDownload = latest;
    }
  },
  actions: {
    async joinSession({ commit }, { sessionId }) {
      try {
        Vue.appInsights.trackEvent({name: "JoinSession", properties: {sessionId: sessionId}});

        const session = await ApiService.joinSession(sessionId);

        commit("setSession", {
          userId: session.userId,
          sessionId: sessionId,
          votingOptions: session.votingOptions,
          token: session.accessToken.token,
        });
        Vue.appInsights.setAuthenticatedUserContext(session.userId);
      } catch (error) {
        notifyError(error.response?.data?.status, error.response?.data?.title);
      } finally {
        /* do nothing */
      }
    },
    async removeActiveSession({ commit, getters }) {
      try {
        Vue.appInsights.trackEvent({name: "Leave session", properties: {session: getters.activeSession}});
        await ApiService.leaveSession(getters.activeSession);

        commit("destroySession");
      } catch (error) {
        notifyError(error.response?.data?.status, error.response?.data?.title);
      } finally {
        /* do nothing */
      }
    },
    // eslint-disable-next-line no-unused-vars
    async castVote({ commit, getters }, { vote }) {
      try {
        Vue.appInsights.trackEvent({name: "CastVote", properties: {session: getters.activeSession, vote: vote}});
        await ApiService.submitVote(vote);
      } catch (error) {
        notifyError(error.response?.data?.status, error.response?.data?.title);
      } finally {
        /* do nothing */
      }
    },
    async fetchLatestAppDownload({ commit }) {
        const app = await ApiService.getLatestAppDownload();
        commit("setLatestAppDownload", app)
    },
  },
  getters: {
    activeSession: (state) => state.session,
    accessToken: (state) => state.accessToken,
    isAuthenticated: (state) =>
      state.accessToken != undefined && state.session != undefined,
    appVersion: (state) => state.packageVersion,
    latestDownload: (state) => state.latestDownload
  },
  modules: {},
});
