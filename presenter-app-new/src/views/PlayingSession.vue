<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '../stores/session';
import { invoke } from '@tauri-apps/api/tauri';
import SessionHealth from '../components/SessionHealth.vue';
import SmileyCounter from '../components/SmileyCounter.vue';

const router = useRouter();
const sessionStore = useSessionStore();
const isLoading = ref(false);
const showCelebration = ref(false);

const session = computed(() => {
  return sessionStore.activeSession;
});

const audience = computed(() => {
  return sessionStore.audience;
});

const sessionId = computed(() => {
  return session.value.id;
});

const votingOptions = computed(() => {
  return session.value.options || [];
});

async function endSession() {
  isLoading.value = true;
  
  try {
    await sessionStore.removeActiveSession();
    router.push({ name: 'Setup' });
  } catch (error) {
    console.error('Failed to end session:', error);
    // Show error notification
  } finally {
    isLoading.value = false;
  }
}

async function toggleCelebration() {
  showCelebration.value = !showCelebration.value;
  
  // Update store state
  sessionStore.toggleCelebration(showCelebration.value);
  
  // Call Tauri API to toggle celebration window
  try {
    await invoke('toggle_celebration', { show: showCelebration.value });
  } catch (error) {
    console.error('Failed to toggle celebration:', error);
  }
}

const copyMessage = ref('');

async function copySessionId() {
  try {
    await navigator.clipboard.writeText(sessionId.value);
    copyMessage.value = 'Session ID copied to clipboard!';
  } catch (error) {
    console.error('Failed to copy session ID:', error);
    copyMessage.value = 'Failed to copy session ID.';
  }
  setTimeout(() => { copyMessage.value = ''; }, 2000);
}
</script>

<template>
  <div class="playing-session">
    <div v-if="copyMessage" class="notification is-info" style="margin-bottom: 1rem;">
      {{ copyMessage }}
    </div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="title">Active Session</h1>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <SessionHealth />
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-content">
        <div class="field">
          <label class="label">Session ID</label>
          <div class="field has-addons">
            <div class="control is-expanded">
              <input 
                class="input" 
                type="text" 
                :value="sessionId" 
                readonly
              >
            </div>
            <div class="control">
              <button class="button is-info" @click="copySessionId">
                <span class="icon">
                  <font-awesome-icon icon="copy" />
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="field">
          <label class="label">Audience</label>
          <p>{{ audience }} connected</p>
        </div>
        
        <div class="field">
          <label class="label">Results</label>
          <div class="results-container">
            <SmileyCounter 
              v-for="option in votingOptions" 
              :key="option.id"
              :emoji="option.name"
              :name="option.name"
              :count="option.count || 0"
            />
          </div>
        </div>
        
        <div class="field is-grouped">
          <div class="control">
            <button 
              class="button is-primary" 
              @click="toggleCelebration"
            >
              <span class="icon">
                <font-awesome-icon :icon="['far', 'heart']" />
              </span>
              <span>{{ showCelebration ? 'Stop Celebration' : 'Start Celebration' }}</span>
            </button>
          </div>
          <div class="control">
            <button 
              class="button is-danger" 
              @click="endSession"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              <span class="icon">
                <font-awesome-icon icon="sign-out-alt" />
              </span>
              <span>End Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playing-session {
  max-width: 600px;
  margin: 0 auto;
}

.results-container {
  margin-top: 0.5rem;
}
</style>