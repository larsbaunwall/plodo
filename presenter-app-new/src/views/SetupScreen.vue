<template>
  <div class="setup-screen">
    <div class="welcome-banner">
      <h1 class="title">Welcome to Plodo!</h1>
      <p class="subtitle">Create a new feedback session to get started</p>
    </div>
    
    <div class="voting-section">
      <VotingConfigurator 
        :max-number-of-options="6"
        :adding-allowed="true"
        @options-changed="onOptionsChanged"
      />
    </div>
    
    <div class="action-section">
      <n-button 
        type="primary" 
        size="large"
        :disabled="!canStartSession"
        @click="startSession"
      >
        Start Session
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { NButton } from 'naive-ui';
import VotingConfigurator from '../components/VotingConfigurator.vue';
import { useSessionStore } from '../stores/session';
import { apiService } from '../services/ApiService';

const router = useRouter();
const sessionStore = useSessionStore();

const selectedOptions = ref<any[]>([]);

const canStartSession = computed(() => selectedOptions.value.length > 0);

function onOptionsChanged(event: { selected: any[] }) {
  selectedOptions.value = event.selected;
}

async function startSession() {
  if (selectedOptions.value.length === 0) return;
  
  try {
    sessionStore.createSession(selectedOptions.value);
    
    await apiService.joinSession(sessionStore.activeSession.id, selectedOptions.value);
    apiService.connectEventStream(sessionStore.activeSession.id);
    
    router.push({ name: 'PlayingSession' });
  } catch (error) {
    console.error('Failed to start session:', error);
  }
}
</script>

<style scoped>
.setup-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-banner {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1B1464;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.voting-section {
  margin-bottom: 3rem;
}

.action-section {
  text-align: center;
}
</style>
