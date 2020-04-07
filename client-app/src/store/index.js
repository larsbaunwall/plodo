import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../common/ApiService'

Vue.use(Vuex)

const emptySession = {
  id: "",
  options: []
};

export default new Vuex.Store({
  state: {
    accessToken: "",
    session: emptySession
  },
  mutations: {
    setToken (state, { token }) {
      state.accessToken = token;
    },
    setSession (state, { sessionId, votingOptions }) {
      state.session = { id: sessionId, options: votingOptions };
    },
    destroySession (state) {
      state.session = emptySession;
      state.accessToken = "";
    }
  },
  actions: {
    async joinSession ({ commit }, { sessionId }) {
      try {
        const session = await ApiService.joinSession(sessionId);

        commit("setToken", { token: session.accessToken.token });
        commit("setSession", { sessionId: sessionId, votingOptions: session.votingOptions });

      } catch (e) {
        throw new Error(e);
      } finally {
        /* do nothing */
      }
    },
    async removeActiveSession ({ commit, getters }) {
      try {
        await ApiService.leaveSession(getters.activeSession)

        commit("destroySession");
      } catch (e) {
        throw new Error(e);
      } finally {
        /* do nothing */
      }
    },
    // eslint-disable-next-line no-unused-vars
    async castVote({commit}, {vote}){
      try {
        await ApiService.submitVote(vote);

      } catch (e) {
        throw new Error(e);
      } finally {
        /* do nothing */
      }
    },
  },
  getters: {
    activeSession: state => state.session,
    accessToken: state => state.accessToken,
  },
  modules: {
  }
})
