import Vue from 'vue'
import Vuex from 'vuex'
import { strictEqual } from 'assert';
import { createPersistedState, createSharedMutations } from "vuex-electron"
import createPromiseAction from './promise-action'
import api from "./api";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: "",
    session: {
      id: "",
      options: [],
    }

  },
  mutations: {
    setToken (state, { token }) {
      state.accessToken = token;
    },
    setSession (state, { sessionId, votingOptions }) {
      state.session = { id: sessionId, options: votingOptions };
    },
    destroySession (state) {
      state.session = {
        id: "",
        options: [],
      };
      state.accessToken = "";
    }
  },
  actions: {
    async createSession ({ commit, getters }, { votingOptions }) {
      try {
        const { data } = await this.$api.axios.post("sessions", {
          votingOptions: votingOptions.map(x => x.id)
        });

        commit("setToken", { token: data.token.access_Token });
        commit("setSession", { sessionId: data.sessionId, votingOptions: votingOptions });

        this.$sse = this.$api.connectEventStream();
      } catch (e) {
          throw new Error(e);
      } finally {}
    },
    async removeActiveSession ({ commit, getters }) {
      try {
        await this.$api.axios.delete(`sessions/${getters.activeSession.id}`);

        commit("destroySession");
      } catch (e) {
        console.log({ e });
      } finally {}
    }
  },
  getters: {
    accessToken: state => state.accessToken,
    activeSession: state => state.session
  },
  plugins: [
    createPersistedState(),
    createSharedMutations(),
    createPromiseAction(),
    api.configure
  ],
  strict: process.env.NODE_ENV !== 'production'
});
