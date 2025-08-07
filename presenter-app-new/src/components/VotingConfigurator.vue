<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:options']);

const defaultOptions = [
  { id: '1', name: '😀', emoji: '😀' },
  { id: '2', name: '😐', emoji: '😐' },
  { id: '3', name: '😞', emoji: '😞' }
];

const options = ref([...defaultOptions]);
let nextId = 4; // Start after the default options

// Generate a UUID v4 for more robust ID generation
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function addOption() {
  options.value.push({ id: generateUUID(), name: '', emoji: '' });
  emitUpdate();
}

function removeOption(index) {
  options.value.splice(index, 1);
  emitUpdate();
}

function resetOptions() {
  options.value = [...defaultOptions];
  emitUpdate();
}

function emitUpdate() {
  emit('update:options', options.value);
}
</script>

<template>
  <div class="voting-configurator">
    <div class="field">
      <label class="label">Voting Options</label>
      <div 
        v-for="(option, index) in options" 
        :key="option.id" 
        class="field has-addons"
      >
        <div class="control is-expanded">
          <input 
            class="input" 
            type="text" 
            v-model="option.name" 
            placeholder="Option name"
            @input="emitUpdate"
          >
        </div>
        <div class="control">
          <button 
            class="button is-danger" 
            @click="removeOption(index)" 
            :disabled="options.length <= 1"
          >
            <span class="icon">
              <font-awesome-icon icon="xmark" />
            </span>
          </button>
        </div>
      </div>
      
      <div class="field is-grouped mt-4">
        <div class="control">
          <button class="button is-info" @click="addOption">
            <span class="icon">
              <font-awesome-icon icon="plus" />
            </span>
            <span>Add Option</span>
          </button>
        </div>
        <div class="control">
          <button class="button" @click="resetOptions">
            <span class="icon">
              <font-awesome-icon icon="undo" />
            </span>
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.voting-configurator {
  margin-bottom: 1.5rem;
}
</style>