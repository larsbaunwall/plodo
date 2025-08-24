<template>
  <div class="has-addons">
    <div class="select">
      <b-select
        v-model="selectedScreen"
        :size="size"
        placeholder="Select screen"
        @input="handleScreenChange"
      >
        <option v-if="primaryScreen" :value="primaryScreen.id">
          Primary ({{ primaryScreen.size.width }}x{{
            primaryScreen.size.height
          }})
        </option>
        <option
          v-for="(screen, idx) in externalScreens"
          :key="screen.id"
          :value="screen.id"
        >
          External {{ idx + 1 }}: ({{ screen.size.width }}x{{
            screen.size.height
          }})
        </option>
      </b-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs } from 'vue'
import { invoke } from '@tauri-apps/api/core'

interface Screen {
  id: string
  name: string
  size: {
    width: number
    height: number
  }
  isPrimary: boolean
}

interface Props {
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'is-normal',
})

const { size } = toRefs(props)

const emit = defineEmits<{
  'screen-changed': [screenId: string]
}>()

const selectedScreen = ref('')
const allScreens = ref<Screen[]>([])

const primaryScreen = computed(() => {
  return allScreens.value.find(x => x.isPrimary) || allScreens.value[0]
})

const externalScreens = computed(() => {
  return allScreens.value.filter(x => !x.isPrimary)
})

const handleScreenChange = () => {
  const screen = allScreens.value.find(x => x.id === selectedScreen.value)
  if (screen) {
    emit('screen-changed', screen.id)
  }
}

onMounted(async () => {
  try {
    const screens = await invoke<Screen[]>('enumerate_displays')
    allScreens.value = screens
    if (primaryScreen.value) {
      selectedScreen.value = primaryScreen.value.id
      handleScreenChange()
    }
  } catch (e) {
    // fallback: keep empty
  }
})
</script>

<style scoped></style>
