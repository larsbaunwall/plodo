<script setup>
import { ref } from 'vue';
import { getVersion } from '@tauri-apps/api/app';
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue';

const appVersion = ref('');

async function loadAppVersion() {
  try {
    appVersion.value = await getVersion();
  } catch (error) {
    console.error('Failed to get app version:', error);
    appVersion.value = 'Unknown';
  }
}

loadAppVersion();
</script>

<template>
  <div class="settings-screen">
    <h1 class="title">Settings</h1>
    
    <div class="card">
      <div class="card-content">
        <ScreenSelectionDropdown />
        
        <div class="field">
          <label class="label">About</label>
          <div class="content">
            <p>
              <strong>Plodo</strong> - A simple voting application for presentations
            </p>
            <p>
              Version: {{ appVersion }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-screen {
  max-width: 600px;
  margin: 0 auto;
}
</style>