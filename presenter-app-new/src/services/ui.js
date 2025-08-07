import { invoke } from '@tauri-apps/api/tauri';
import { useSessionStore } from '../stores/session';

class UIService {
  constructor() {
    this.init();
  }

  async init() {
    const sessionStore = useSessionStore();
    await this.enumerateScreens();
    
    // If active screen is no longer available, default to primary display
    const screens = sessionStore.allScreens;
    const celebrationScreen = sessionStore.celebrationScreen;
    const celebrationScreenId = (celebrationScreen && typeof celebrationScreen === 'object' && 'id' in celebrationScreen)
      ? celebrationScreen.id
      : celebrationScreen;
    if (screens.length > 0 && !screens.find(x => x.id === celebrationScreenId)) {
      sessionStore.changeCelebrationScreen(await this.getPrimaryDisplay());
    }
    
    // Monitor for screen changes
    // Note: Tauri doesn't have direct screen change events like Electron
    // This is a simplified approach
    setInterval(async () => {
      await this.enumerateScreens();
    }, 5000);
  }

  /**
   * @returns {{id, size, bounds, isPrimary}[]} all displays
   */
  async getAllDisplays() {
    try {
      // Call the Rust function to get screens
      const screens = await invoke('get_screens');
      return screens;
    } catch (error) {
      console.error('Failed to get displays:', error);
      // Fallback to primary display
      const primary = await this.getPrimaryDisplay();
      return [primary];
    }
  }

  /**
   * @returns {{id, size, bounds, isPrimary}} the primary display
   */
  async getPrimaryDisplay() {
    try {
      // Call the Rust function to get screens
      const screens = await invoke('get_screens');
      // Find the primary display
      const primary = screens.find(screen => screen.is_primary);
      return primary || screens[0];
    } catch (error) {
      console.error('Failed to get primary display:', error);
      // Fallback to browser window size
      return {
        id: 'primary',
        size: {
          width: window.screen.width,
          height: window.screen.height,
        },
        bounds: {
          x: 0,
          y: 0
        },
        is_primary: true,
      };
    }
  }

  async enumerateScreens() {
    const sessionStore = useSessionStore();
    const displays = await this.getAllDisplays();
    sessionStore.screens = displays;
    return displays;
  }
}

export const uiService = new UIService();