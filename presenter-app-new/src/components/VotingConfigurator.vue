<template>
  <form @submit.prevent="submit">
    <label>Session ID</label>
    <input v-model="id" placeholder="ABC123" />
    <label>Options</label>
    <input v-model="optionsText" placeholder="comma,separated,options" />
    <button type="submit">Start</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'start', payload: { id: string; options: any[] }): void;
}>();

const id = ref('');
const optionsText = ref('');

function submit() {
  const options = optionsText.value.split(',').map((s) => s.trim()).filter(Boolean);
  emit('start', { id: id.value, options });
}
</script>
