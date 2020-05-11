import Vue from "vue";
import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron";
import createPromiseAction from "./promise-action";
import ApiService from "../common/ApiService";
import UIService from "../common/UIService";

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
    screens: [],
    celebrationScreen: 0,
    stream: {
      connected: false,
    }
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
    toggleCelebration(state, shouldCelebrate) {
      state.celebrate = shouldCelebrate;
    },
    setSessionStream(state, isConnected) {
      state.stream.connected = isConnected;
    },
    setScreens(state, screens) {
      state.screens = screens;
    },
    setCelebrationScreen(state, screen){
      state.celebrationScreen = screen;
    }
  },
  actions: {
    async createSession({ commit, dispatch, getters }, { votingOptions }) {
      try {
        const {sessionId, accessToken} = await ApiService.joinSession(votingOptions);

        commit("setToken", { token: accessToken.token });
        commit("setSession", { sessionId: sessionId, votingOptions: votingOptions });

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
    connectSessionStream(){
      ApiService.connectEventStream();
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
    toggleCelebration({commit}, shouldCelebrate){
      commit("toggleCelebration", shouldCelebrate);
    },
    updateSessionStreamState({commit}, isConnected){
      commit("setSessionStream", isConnected);
    },
    enumerateScreens({commit}){
      commit("setScreens", UIService.getAllDisplays());
    },
    changeCelebrationScreen({commit}, screen)
    {
      commit("setCelebrationScreen", screen);
    }
  },
  getters: {
    accessToken: (state) => state.accessToken,
    activeSession: (state) => state.session,
    celebrate: (state) => state.celebrate,
    audience: (state) => state.audience,
    sessionStream: (state) => state.stream,
    celebrationScreen: (state) => state.celebrationScreen,
    allScreens: (state) => state.screens,
  },
  plugins: [createPersistedState(), createSharedMutations(), createPromiseAction()],
  strict: true
});
