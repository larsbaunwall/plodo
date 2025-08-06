<template>
  <div ref="containerRef" class="celebration-screen">
    <div class="celebration-content">
      <h1>🎉 Celebration Mode Active! 🎉</h1>
      <p>Emoji animations will appear here during celebrations</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const containerRef = ref<HTMLElement>();

// Simplified celebration screen for now
// Two.js integration can be added later once the basic build is working
</script>

<style scoped>
.celebration-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.celebration-content {
  text-align: center;
  color: white;
}

.celebration-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.celebration-content p {
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>
