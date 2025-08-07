import { defineStore } from 'pinia';

type Session = {
  id: string;
  options: any[];
};

type Monitor = {
  id: string;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
  size: { width: number; height: number };
  scaleFactor?: number;
};

type StreamState = {
  connected: boolean;
};

export const useMainStore = defineStore('main', {
  state: () => ({
    celebrate: false as boolean,
    audience: 0 as number,
    accessToken: '' as string,
    session: { id: '', options: [] } as Session,
    screens: [] as Monitor[],
    celebrationScreen: null as Monitor | null,
    stream: { connected: false } as StreamState
  }),
  getters: {
    allScreens: (s) => s.screens
  },
  actions: {
    toggleCelebration(shouldCelebrate: boolean) {
      this.celebrate = shouldCelebrate;
    },
    setSessionStream(isConnected: boolean) {
      this.stream.connected = isConnected;
    },
    setScreens(screens: Monitor[]) {
      this.screens = screens;
      if (!this.celebrationScreen && screens.length) {
        this.celebrationScreen = screens[0];
      }
    },
    changeCelebrationScreen(screen: Monitor) {
      this.celebrationScreen = screen;
    },
    incrementAudience() {
      this.audience += 1;
    },
    audienceLeft() {
      this.audience = Math.max(0, this.audience - 1);
    },
    setSession(session: Session) {
      this.session = session;
    }
  }
});
