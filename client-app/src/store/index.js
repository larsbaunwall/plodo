import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '../common/ApiService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    session: null
  },
  mutations: {
    setSession (state, { sessionId, votingOptions, token }) {
      state.accessToken = token;
      state.session = { id: sessionId, options: votingOptions };
    },
    destroySession (state) {
      state.session = null;
      state.accessToken = null;
    }
  },
  actions: {
    async joinSession ({ commit }, { sessionId }) {
      try {
        const session = await ApiService.joinSession(sessionId);

        commit("setSession", { sessionId: sessionId, votingOptions: session.votingOptions, token: session.accessToken.token });

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
    isAuthenticated: state => state.accessToken != undefined && state.session != undefined
  },
  modules: {
  }
})
