<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  emoji: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="smiley-counter">
    <div class="smiley-counter-content">
      <span class="smiley-counter-emoji">{{ emoji }}</span>
      <span class="smiley-counter-name">{{ name }}</span>
    </div>
    <div class="smiley-counter-count">
      {{ count }}
    </div>
  </div>
</template>

<style scoped>
.smiley-counter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  margin-bottom: 0.75rem;
}

.smiley-counter-content {
  display: flex;
  align-items: center;
}

.smiley-counter-emoji {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.smiley-counter-name {
  font-size: 1rem;
}

.smiley-counter-count {
  font-weight: bold;
  font-size: 1.25rem;
}
</style>