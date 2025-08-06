<template>
  <div class="playing-session">
    <div class="session-header">
      <h1 class="session-title">Active Session</h1>
      <div class="session-info">
        <n-tag type="info" size="large" class="session-id">
          Session ID: {{ sessionStore.activeSession.id }}
        </n-tag>
        <n-button 
          @click="copySessionId"
          size="small"
          quaternary
          title="Copy to clipboard"
        >
          <template #icon>
            <n-icon :component="CopyOutline" />
          </template>
        </n-button>
      </div>
    </div>

    <div class="audience-info">
      <n-statistic label="Audience Members" :value="sessionStore.activeSession.audienceCount" />
    </div>

    <div class="voting-results">
      <SmileyCounter 
        v-for="option in sessionStore.activeSession.options"
        :key="option.id"
        :smiley="option.id"
        :count="sessionStore.activeSession.votes[option.id] || 0"
      />
    </div>

    <div class="celebration-controls">
      <div class="celebration-header">
        <h3>Celebration Display</h3>
        <ScreenSelectionDropdown />
      </div>
      <n-button 
        :type="sessionStore.celebration.active ? 'warning' : 'primary'"
        @click="toggleCelebration"
        size="large"
      >
        {{ sessionStore.celebration.active ? 'Stop Celebration' : 'Start Celebration' }}
      </n-button>
    </div>

    <div class="session-actions">
      <n-button 
        type="error"
        @click="endSession"
        size="large"
      >
        End Session
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NTag, NButton, NIcon, NStatistic } from 'naive-ui';
import { CopyOutline } from '@vicons/ionicons5';
import { useSessionStore } from '../stores/session';
import { apiService } from '../services/ApiService';
import SmileyCounter from '../components/SmileyCounter.vue';
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue';

const router = useRouter();
const sessionStore = useSessionStore();

async function copySessionId() {
  try {
    await navigator.clipboard.writeText(sessionStore.activeSession.id);
  } catch (error) {
    console.error('Failed to copy session ID:', error);
  }
}

function toggleCelebration() {
  sessionStore.toggleCelebration();
}

async function endSession() {
  try {
    await apiService.leaveSession(sessionStore.activeSession.id);
    apiService.closeEventStream();
    sessionStore.removeSession();
    router.push({ name: 'Setup' });
  } catch (error) {
    console.error('Failed to end session:', error);
  }
}
</script>

<style scoped>
.playing-session {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.session-header {
  text-align: center;
  margin-bottom: 2rem;
}

.session-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1B1464;
  margin-bottom: 1rem;
}

.session-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.session-id {
  font-family: monospace;
  font-size: 1.2rem;
}

.audience-info {
  text-align: center;
  margin-bottom: 2rem;
}

.voting-results {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.celebration-controls {
  background: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.celebration-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.session-actions {
  text-align: center;
}
</style>
