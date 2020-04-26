import Vue from "vue";
import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron";
import createPromiseAction from "./promise-action";
import ApiService from "../common/ApiService";
import { remote, ipcRenderer } from "electron";

Vue.use(Vuex);

const emptySession = {
  id: "",
  options: [],
};

export default new Vuex.Store({
  state: {
    celebrate: false,
    audience: 0,
    accessToken: "",
    session: emptySession,
  },
  mutations: {
    setToken(state, { token }) {
      state.accessToken = token;
    },
    setSession(state, { sessionId, votingOptions }) {
      const transformedOptions = votingOptions.map((x) => {
        return { id: x.id, name: x.name, count: x.count || 0 };
      });
      state.session = { id: sessionId, options: transformedOptions };
    },
    destroySession(state) {
      state.session = emptySession;
      state.accessToken = "";
    },
    recordVote(state, { id }) {
      let foundIdx = state.session.options.findIndex((x) => x.id === id);

      if (foundIdx != undefined) {
        let foundItem = state.session.options[foundIdx];
        foundItem.count = (foundItem.count || 0) + 1;
        Vue.set(state.session.options, foundIdx, foundItem);
      }
    },
    incrementAudience(state){
      state.audience =+ 1;
    },
    decrementAudience(state){
      state.audience =- 1;
    },
    toggleCelebration(state, {shouldCelebrate}) {
      state.celebrate = shouldCelebrate;
    }
  },
  actions: {
    async createSession({ commit, getters }, { votingOptions }) {
      try {
        const data = await ApiService.joinSession(votingOptions);

        commit("setToken", { token: data.accessToken.token });
        commit("setSession", { sessionId: data.sessionId, votingOptions: votingOptions });

        ApiService.connectEventStream();
      } catch (e) {
        throw new Error(e);
      } finally {
      }
    },
    async removeActiveSession({ commit, getters }) {
      try {
        await ApiService.leaveSession(getters.activeSession.id);

        commit("destroySession");
      } catch (e) {
        console.log({ e });
      } finally {
      }
    },
    processVote({ commit }, vote) {
      commit("recordVote", { id: vote.data });
    },
    audienceJoined({commit}){
      commit("incrementAudience");
    },
    audienceLeft({commit}){
      commit("decrementAudience");
    },
    toggleCelebration({shouldCelebrate}){
      commit("toggleCelebration", {shouldCelebrate});
    }
  },
  getters: {
    accessToken: (state) => state.accessToken,
    activeSession: (state) => state.session,
    celebrate: (state) => state.celebrate,
    audience: (state) => state.audience,
  },
  plugins: [createPersistedState(), createSharedMutations(), createPromiseAction()],
  strict: process.env.NODE_ENV !== "production",
});
