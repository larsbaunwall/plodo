<template>
  <div class="settings-screen">
    <div class="settings-section">
      <h2 class="section-title">Celebration settings</h2>
      
      <div class="setting-item">
        <div class="setting-label">
          <n-icon :component="TvOutline" />
          <span>Celebration screen</span>
        </div>
        <div class="setting-control">
          <ScreenSelectionDropdown />
        </div>
      </div>
    </div>

    <n-divider />

    <div class="settings-section">
      <h2 class="section-title">Support</h2>
      
      <p class="section-description">
        Got an idea for a new feature or want to submit a bug? That is just awesome 
        <Twemoji emoji="💪" css-class="inline-emoji" /> please let us know!
      </p>
      
      <div class="setting-item">
        <div class="setting-label">
          <span>Open an issue on GitHub</span>
        </div>
        <div class="setting-control">
          <n-button 
            @click="openIssue"
            type="primary"
            ghost
          >
            <template #icon>
              <n-icon :component="OpenOutline" />
            </template>
            Open issue
          </n-button>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <h2 class="section-title">About</h2>
      
      <p class="section-description">
        plodo started out as an idea to get audiences more involved during online and offline presentations.
      </p>
      
      <p class="section-description">
        We hope you enjoy it as much as we do building it!
      </p>
      
      <h3 class="subsection-title">Get involved</h3>
      
      <p class="section-description">
        This project is 
        <n-button 
          text 
          @click="openRepository"
          class="inline-link"
        >
          open source
        </n-button>. If you like it, help us by 
        <Twemoji emoji="⭐" css-class="inline-emoji" /> our repo on GitHub or recommend plodo to a friend 
        <Twemoji emoji="❤" css-class="inline-emoji" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon, NDivider } from 'naive-ui';
import { TvOutline, OpenOutline } from '@vicons/ionicons5';
import { invoke } from '@tauri-apps/api/core';
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue';
import Twemoji from '../components/Twemoji.vue';

async function openIssue() {
  try {
    await invoke('open_url', { url: 'https://github.com/larsbaunwall/plodo/issues/new' });
  } catch (error) {
    console.error('Failed to open issue URL:', error);
  }
}

async function openRepository() {
  try {
    await invoke('open_url', { url: 'https://github.com/larsbaunwall/plodo' });
  } catch (error) {
    console.error('Failed to open repository URL:', error);
  }
}
</script>

<style scoped>
.settings-screen {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.settings-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1B1464;
  margin-bottom: 1rem;
}

.subsection-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2E3192;
  margin: 1rem 0 0.5rem 0;
}

.section-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.setting-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.setting-control {
  flex-shrink: 0;
}

.inline-link {
  padding: 0;
  height: auto;
  color: #2E3192;
  text-decoration: underline;
}

:deep(.inline-emoji) {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
