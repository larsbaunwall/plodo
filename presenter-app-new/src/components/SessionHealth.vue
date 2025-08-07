<template>
  <div :class="['health', connected ? 'ok' : 'bad']">
    <span>{{ connected ? 'Connected' : 'Disconnected' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ connected: boolean }>();
</script>

<style scoped>
.health {
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
}
.ok {
  background: #16a34a;
}
.bad {
  background: #dc2626;
}
</style>
