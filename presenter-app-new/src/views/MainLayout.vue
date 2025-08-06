<template>
  <div id="app" class="main-container">
    <TabMenu />
    <main class="main-section">
      <router-view />
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-logo">Plodo</div>
        </div>
        <div class="footer-right">
          <SessionHealth />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TabMenu from '../components/TabMenu.vue';
import SessionHealth from '../components/SessionHealth.vue';
</script>

<style scoped>
.main-container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fafafa;
}

.main-section {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem;
}

.footer {
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-logo {
  font-weight: bold;
  color: var(--primary);
  font-size: 1.2rem;
}
</style>
