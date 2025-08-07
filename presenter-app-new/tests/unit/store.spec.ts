import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useMainStore } from '../../src/stores/main';

describe('main store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('toggles celebration', () => {
    const s = useMainStore();
    s.toggleCelebration(true);
    expect(s.celebrate).toBe(true);
    s.toggleCelebration(false);
    expect(s.celebrate).toBe(false);
  });

  it('manages audience', () => {
    const s = useMainStore();
    s.incrementAudience();
    s.incrementAudience();
    expect(s.audience).toBe(2);
    s.audienceLeft();
    expect(s.audience).toBe(1);
  });

  it('sets screens and default selection', () => {
    const s = useMainStore();
    const screens = [
      { id: '1', name: 'Display 1', bounds: { x: 0, y: 0, width: 800, height: 600 }, size: { width: 800, height: 600 } },
      { id: '2', name: 'Display 2', bounds: { x: 800, y: 0, width: 800, height: 600 }, size: { width: 800, height: 600 } }
    ];
    s.setScreens(screens as any);
    expect(s.allScreens.length).toBe(2);
    expect(s.celebrationScreen?.id).toBe('1');
    s.changeCelebrationScreen(screens[1] as any);
    expect(s.celebrationScreen?.id).toBe('2');
  });
});
