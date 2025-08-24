<template>
  <div class="has-addons">
    <div class="select">
      <b-select
        v-model="selectedScreen"
        :size="size"
        placeholder="Select screen"
        @input="handleScreenChange"
      >
        <option :value="primaryScreen.id">
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
const allScreens = ref<Screen[]>([
  {
    id: 'primary',
    name: 'Primary Screen',
    size: { width: 1920, height: 1080 },
    isPrimary: true,
  },
  {
    id: 'external-1',
    name: 'External Monitor 1',
    size: { width: 2560, height: 1440 },
    isPrimary: false,
  },
  {
    id: 'external-2',
    name: 'External Monitor 2',
    size: { width: 1366, height: 768 },
    isPrimary: false,
  },
])

const primaryScreen = computed(() => {
  return allScreens.value.find(x => x.isPrimary) || allScreens.value[0]
})

const externalScreens = computed(() => {
  return allScreens.value.filter(x => !x.isPrimary)
})

// Watch for changes and emit
const handleScreenChange = () => {
  const screen = allScreens.value.find(x => x.id === selectedScreen.value)
  if (screen) {
    emit('screen-changed', screen.id)
  }
}

onMounted(() => {
  selectedScreen.value = primaryScreen.value.id
  handleScreenChange()
})
</script>

<style scoped></style>
