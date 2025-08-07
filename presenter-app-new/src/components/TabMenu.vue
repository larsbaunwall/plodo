<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSessionStore } from '../stores/session';

const router = useRouter();
const route = useRoute();
const sessionStore = useSessionStore();

const activeTab = computed(() => {
  if (route.path.includes('/session')) return 'session';
  if (route.path.includes('/settings')) return 'settings';
  return '';
});

const hasActiveSession = computed(() => {
  return sessionStore.activeSession && sessionStore.activeSession.id !== '';
});

function navigateToSession() {
  router.push({ name: 'Start' });
}

function navigateToSettings() {
  router.push({ name: 'Settings' });
}
</script>

<template>
  <div class="tab-menu">
    <div class="tabs is-centered is-boxed">
      <ul>
        <li :class="{ 'is-active': activeTab === 'session' }">
          <a @click="navigateToSession">
            <span class="icon is-small">
              <font-awesome-icon :icon="hasActiveSession ? 'bullhorn' : 'play'" />
            </span>
            <span>{{ hasActiveSession ? 'Session' : 'New Session' }}</span>
          </a>
        </li>
        <li :class="{ 'is-active': activeTab === 'settings' }">
          <a @click="navigateToSettings">
            <span class="icon is-small">
              <font-awesome-icon icon="cog" />
            </span>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tab-menu {
  padding-top: 0.5rem;
}
</style>