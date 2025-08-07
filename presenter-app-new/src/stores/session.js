import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService } from '../services/api';

export const useSessionStore = defineStore('session', () => {
  // State
  const accessToken = ref('');
  const session = ref({
    id: '',
    options: [],
  });
  const audience = ref(0);
  const celebrate = ref(false);
  const stream = ref({
    connected: false,
  });
  const screens = ref([]);
  const celebrationScreen = ref(0);

  // Getters
  const activeSession = computed(() => session.value);
  const sessionStream = computed(() => stream.value);
  const allScreens = computed(() => screens.value);

  // Actions
  async function createSession(votingOptions) {
    try {
      const { sessionId, accessToken: token } = await apiService.joinSession(votingOptions);
      
      setToken(token.token);
      setSession(sessionId, votingOptions);
      
      apiService.connectEventStream();
    } catch (e) {
      throw new Error(e);
    }
  }

  async function removeActiveSession() {
    try {
      await apiService.leaveSession(activeSession.value.id);
      destroySession();
    } catch (e) {
      console.log({ e });
    }
  }

  function connectSessionStream() {
    apiService.connectEventStream();
  }

  function processVote(vote) {
    recordVote(vote.data);
  }

  function audienceJoined() {
    incrementAudience();
  }

  function audienceLeft() {
    decrementAudience();
  }

  function toggleCelebration(shouldCelebrate) {
    celebrate.value = shouldCelebrate;
  }

  function updateSessionStreamState(isConnected) {
    stream.value.connected = isConnected;
  }

  function enumerateScreens() {
    // This will be implemented in the UI service
  }

  function changeCelebrationScreen(screen) {
    celebrationScreen.value = screen;
  }

  // Mutations
  function setToken(token) {
    accessToken.value = token;
  }

  function setSession(sessionId, votingOptions) {
    const transformedOptions = votingOptions.map((x) => {
      return { id: x.id, name: x.name, count: x.count || 0 };
    });
    session.value = { id: sessionId, options: transformedOptions };
  }

  function destroySession() {
    session.value = { id: '', options: [] };
    accessToken.value = '';
  }

  function recordVote(id) {
    const foundIdx = session.value.options.findIndex((x) => x.id === id);

    if (foundIdx !== -1) {
      const foundItem = session.value.options[foundIdx];
      foundItem.count = (foundItem.count || 0) + 1;
      session.value.options[foundIdx] = foundItem;
    }
  }

  function incrementAudience() {
    audience.value += 1;
  }

  function decrementAudience() {
    audience.value -= 1;
  }

  return {
    // State
    accessToken,
    session,
    audience,
    celebrate,
    stream,
    screens,
    celebrationScreen,
    
    // Getters
    activeSession,
    sessionStream,
    allScreens,
    
    // Actions
    createSession,
    removeActiveSession,
    connectSessionStream,
    processVote,
    audienceJoined,
    audienceLeft,
    toggleCelebration,
    updateSessionStreamState,
    enumerateScreens,
    changeCelebrationScreen,
    
    // Mutations
    setToken,
    setSession,
    destroySession,
    recordVote,
    incrementAudience,
    decrementAudience
  };
});