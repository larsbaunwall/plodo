<template>
  <div class="layout">
    <div class="tabs">
      <TabMenu />
    </div>
    <div class="content">
      <h1>Start session</h1>
      <VotingConfigurator @start="startSession" />
      <div class="settings-link">
        <router-link to="/settings">Settings</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import VotingConfigurator from '../components/VotingConfigurator.vue';
import TabMenu from '../components/TabMenu.vue';
import { useMainStore } from '../stores/main';

const router = useRouter();
const store = useMainStore();

function startSession(payload: { id: string; options: any[] }) {
  store.setSession({ id: payload.id, options: payload.options });
  router.push('/play');
}
</script>
