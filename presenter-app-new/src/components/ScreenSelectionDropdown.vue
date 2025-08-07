<template>
  <select :value="modelValue?.id" @change="onChange">
    <option
      v-for="s in screens"
      :key="s.id"
      :value="s.id"
    >
      {{ s.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
type Monitor = {
  id: string;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
  size: { width: number; height: number };
};

const props = defineProps<{
  screens: Monitor[];
  selected?: Monitor | null;
  modelValue?: Monitor | null;
}>();

const emit = defineEmits<{
  (e: 'select', screen: Monitor): void;
}>();

function onChange(e: Event) {
  const id = (e.target as HTMLSelectElement).value;
  const screen = props.screens.find((s) => s.id === id);
  if (screen) emit('select', screen);
}
</script>
