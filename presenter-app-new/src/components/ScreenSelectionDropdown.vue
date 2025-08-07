<script setup>
import { computed } from 'vue';
import { useSessionStore } from '../stores/session';

const sessionStore = useSessionStore();

const screens = computed(() => {
  return sessionStore.allScreens;
});

const selectedScreen = computed(() => {
  return sessionStore.celebrationScreen;
});

function selectScreen(screen) {
  sessionStore.changeCelebrationScreen(screen);
}
</script>

<template>
  <div class="field">
    <label class="label">Celebration Screen</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select v-model="selectedScreen" @change="selectScreen($event.target.value)">
          <option 
            v-for="screen in screens" 
            :key="screen.id" 
            :value="screen"
          >
            {{ screen.isPrimary ? 'Primary Display' : `Display ${screen.id}` }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>