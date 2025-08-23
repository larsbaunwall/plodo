<template>
  <div class="field">
    <div class="control">
      <div class="select">
        <select 
          :value="selectedScreenId" 
          @change="handleScreenChange"
        >
          <option value="">Primary Screen</option>
          <option 
            v-for="screen in availableScreens" 
            :key="screen.id"
            :value="screen.id"
          >
            {{ screen.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Screen {
  id: string
  name: string
  width: number
  height: number
  isPrimary: boolean
}

const emit = defineEmits<{
  'screen-changed': [screenId: string]
}>()

const selectedScreenId = ref('')
const availableScreens = ref<Screen[]>([])

const handleScreenChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selectedScreenId.value = target.value
  emit('screen-changed', target.value)
}

onMounted(async () => {
  // In a real implementation, you would get available screens from Tauri
  // For now, we'll mock some screen data
  availableScreens.value = [
    {
      id: 'screen-1',
      name: 'External Monitor (1920x1080)',
      width: 1920,
      height: 1080,
      isPrimary: false
    },
    {
      id: 'screen-2',
      name: 'Secondary Display (1366x768)',
      width: 1366,
      height: 768,
      isPrimary: false
    }
  ]
})
</script>

<style scoped>
</style>
