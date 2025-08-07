import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ScreenSelectionDropdown from '../../src/components/ScreenSelectionDropdown.vue';
import SmileyCounter from '../../src/components/SmileyCounter.vue';

describe('components', () => {
  it('ScreenSelectionDropdown emits select', async () => {
    const screens = [
      { id: '1', name: 'Display 1', bounds: { x:0, y:0, width: 800, height: 600 }, size: { width: 800, height: 600 } },
      { id: '2', name: 'Display 2', bounds: { x:800, y:0, width: 800, height: 600 }, size: { width: 800, height: 600 } },
    ];
    const wrapper = mount(ScreenSelectionDropdown, {
      props: { screens, modelValue: screens[0] }
    });
    await wrapper.find('select').setValue('2');
    const events = wrapper.emitted('select') || [];
    expect(events.length).toBe(1);
    expect(events[0][0].id).toBe('2');
  });

  it('SmileyCounter shows count', () => {
    const wrapper = mount(SmileyCounter, { props: { count: 3 } });
    expect(wrapper.text()).toContain('3');
  });
});
