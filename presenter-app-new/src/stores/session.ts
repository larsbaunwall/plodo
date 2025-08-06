import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface VotingOption {
  id: string;
  name: string;
}

export interface Session {
  id: string;
  options: VotingOption[];
  votes: Record<string, number>;
  audienceCount: number;
}

export interface StreamConnection {
  connected: boolean;
  reconnecting: boolean;
}

export const useSessionStore = defineStore('session', () => {
  const activeSession = ref<Session>({
    id: '',
    options: [],
    votes: {},
    audienceCount: 0
  });

  const sessionStream = ref<StreamConnection>({
    connected: false,
    reconnecting: false
  });

  const celebration = ref({
    active: false,
    screen: null as any
  });

  const allScreens = ref<any[]>([]);

  const isSessionActive = computed(() => activeSession.value.id !== '');
  
  const celebrationScreen = computed(() => 
    celebration.value.screen || allScreens.value.find(s => s.isPrimary)
  );

  function createSession(options: VotingOption[]) {
    const sessionId = Math.random().toString(36).substring(2, 8).toUpperCase();
    activeSession.value = {
      id: sessionId,
      options,
      votes: options.reduce((acc, opt) => ({ ...acc, [opt.id]: 0 }), {}),
      audienceCount: 0
    };
  }

  function removeSession() {
    activeSession.value = {
      id: '',
      options: [],
      votes: {},
      audienceCount: 0
    };
    sessionStream.value.connected = false;
  }

  function recordVote(emojiId: string) {
    if (activeSession.value.votes[emojiId] !== undefined) {
      activeSession.value.votes[emojiId]++;
    }
  }

  function updateAudienceCount(count: number) {
    activeSession.value.audienceCount = count;
  }

  function setStreamConnection(connected: boolean) {
    sessionStream.value.connected = connected;
    sessionStream.value.reconnecting = false;
  }

  function setReconnecting(reconnecting: boolean) {
    sessionStream.value.reconnecting = reconnecting;
  }

  function toggleCelebration() {
    celebration.value.active = !celebration.value.active;
  }

  function setCelebrationScreen(screen: any) {
    celebration.value.screen = screen;
  }

  function setAllScreens(screens: any[]) {
    allScreens.value = screens;
  }

  return {
    activeSession,
    sessionStream,
    celebration,
    allScreens,
    isSessionActive,
    celebrationScreen,
    createSession,
    removeSession,
    recordVote,
    updateAudienceCount,
    setStreamConnection,
    setReconnecting,
    toggleCelebration,
    setCelebrationScreen,
    setAllScreens
  };
});
