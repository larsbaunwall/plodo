<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:options']);

const defaultOptions = [
  { id: '1', name: '😀', emoji: '😀' },
  { id: '2', name: '😐', emoji: '😐' },
  { id: '3', name: '😞', emoji: '😞' }
];

const options = ref([...defaultOptions]);

function addOption() {
  options.value.push({ id: Date.now().toString(), name: '', emoji: '' });
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