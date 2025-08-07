<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSessionStore } from '../stores/session';
import VotingConfigurator from '../components/VotingConfigurator.vue';

const router = useRouter();
const sessionStore = useSessionStore();

const isLoading = ref(false);
const votingOptions = ref([
  { id: '1', name: '😀', emoji: '😀' },
  { id: '2', name: '😐', emoji: '😐' },
  { id: '3', name: '😞', emoji: '😞' }
]);

async function createSession() {
  isLoading.value = true;
  
  try {
    await sessionStore.createSession(votingOptions.value);
    router.push({ name: 'PlayingSession' });
  } catch (error) {
    console.error('Failed to create session:', error);
    // Show error notification
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="setup-screen">
    <h1 class="title">Create New Session</h1>
    
    <div class="card">
      <div class="card-content">
        <VotingConfigurator v-model:options="votingOptions" />
        
        <div class="field">
          <div class="control">
            <button 
              class="button is-primary is-fullwidth" 
              @click="createSession"
              :class="{ 'is-loading': isLoading }"
              :disabled="isLoading"
            >
              <span class="icon">
                <font-awesome-icon icon="play" />
              </span>
              <span>Start Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.setup-screen {
  max-width: 600px;
  margin: 0 auto;
}
</style>