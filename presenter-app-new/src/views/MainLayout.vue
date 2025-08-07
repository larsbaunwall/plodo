<script setup>
import TabMenu from '../components/TabMenu.vue';
</script>

<template>
  <div class="app-container">
    <TabMenu />
    <div class="main-content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>