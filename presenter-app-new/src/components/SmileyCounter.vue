<template>
  <div class="smiley-counter">
    <span class="emoji">😊</span>
    <span class="count">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ count: number }>();
</script>

<style scoped>
.smiley-counter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
}
.emoji {
  font-size: 28px;
}
.count {
  font-weight: 600;
}
</style>
