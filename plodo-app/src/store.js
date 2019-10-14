import Vue from 'vue'
import Vuex from 'vuex'
import { strictEqual } from 'assert';

import { createPersistedState, createSharedMutations } from "vuex-electron"

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
    setSession (state, { session }) {
      state.session = session;
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
    async createSession (commit, { votingOptions }) {
      try {
        const { data } = await this.$api.post("sessions", {
          votingOptions: votingOptions
        });

        commit("setToken", { token: data.token.access_Token });
        commit("setSession", { session: data.sessionId });
      } catch (e) {
        console.log({ e });
      } finally {}
    },
    async removeActiveSession (commit, getters) {
      try {
        await this.$api.delete(`sessions/${getters.activeSession.id}`);

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
    createSharedMutations()
  ],
})
