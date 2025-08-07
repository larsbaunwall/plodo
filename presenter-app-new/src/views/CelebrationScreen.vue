<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const hearts = ref([]);
const animationFrameId = ref(null);

function createHeart() {
  const heart = {
    x: Math.random() * window.innerWidth,
    y: window.innerHeight + 100,
    size: 20 + Math.random() * 30,
    speed: 1 + Math.random() * 3,
    opacity: 0.1 + Math.random() * 0.9,
    rotation: Math.random() * 360
  };
  
  hearts.value.push(heart);
  
  // Remove hearts when they go off screen
  if (hearts.value.length > 100) {
    hearts.value = hearts.value.filter(h => h.y > -100);
  }
}

function animate() {
  // Move hearts upward
  hearts.value.forEach(heart => {
    heart.y -= heart.speed;
    heart.rotation += 0.2;
  });
  
  // Create new hearts
  if (Math.random() > 0.9) {
    createHeart();
  }
  
  animationFrameId.value = requestAnimationFrame(animate);
}

onMounted(() => {
  // Start animation
  animate();
  
  // Create initial hearts
  for (let i = 0; i < 20; i++) {
    createHeart();
  }
});

onUnmounted(() => {
  // Clean up animation
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>

<template>
  <div class="celebration-container">
    <div 
      v-for="(heart, index) in hearts" 
      :key="index"
      class="heart"
      :style="{
        left: `${heart.x}px`,
        top: `${heart.y}px`,
        fontSize: `${heart.size}px`,
        opacity: heart.opacity,
        transform: `rotate(${heart.rotation}deg)`
      }"
    >
      ❤️
    </div>
  </div>
</template>

<style scoped>
.celebration-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1000;
  background-color: transparent;
}

.heart {
  position: absolute;
  user-select: none;
}
</style>