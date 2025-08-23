<template>
  <div class="voting-configurator">
    <div class="field">
      <label class="label">Configure Voting Options</label>
      <div class="help">
        Select up to {{ maxNumberOfOptions }} voting options for your session
      </div>
    </div>

    <div class="buttons is-centered">
      <template v-for="(_, idx) in maxOptions" :key="idx">
        <button
          v-if="selectedOptions[idx] !== undefined"
          class="button is-outline is-large"
          @click="unselectOption(idx)"
        >
          <span style="font-size: 1.5rem;">{{ selectedOptions[idx].emoji }}</span>
        </button>
        <div v-else class="dropdown" :class="{ 'is-active': activeDropdown === idx }">
          <div class="dropdown-trigger">
            <button
              class="button is-outline is-large"
              @click="toggleDropdown(idx)"
            >
              <span class="icon">
                <i class="fas fa-question has-text-info"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a
                v-for="opt in availableOptions"
                :key="opt.id"
                class="dropdown-item"
                @click="chooseOption(idx, opt)"
              >
                <span style="font-size: 1.2rem;">{{ opt.emoji }}</span>
                <span class="ml-2">{{ opt.label }}</span>
              </a>
            </div>
          </div>
        </div>
      </template>
      <button
        v-if="addingAllowed"
        class="button is-large is-outline"
        title="Add one more"
        @click="addOption"
      >
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
      </button>
      <button
        v-if="selectedOptions.filter(Boolean).length > 0"
        class="button is-large is-outline"
        title="Start over"
        @click="reset"
      >
        <span class="icon">
          <i class="fas fa-undo"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface VotingOption {
  id: string
  emoji: string
  label: string
}

interface Props {
  maxNumberOfOptions: number
  addingAllowed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  addingAllowed: true
})

const emit = defineEmits<{
  'options-changed': [data: { selected: VotingOption[] }]
}>()

const options: VotingOption[] = [
  { id: '😀', emoji: '😀', label: 'Smile' },
  { id: '😡', emoji: '�', label: 'Pouting' },
  { id: '❤️', emoji: '❤️', label: 'Love' },
  { id: '😍', emoji: '�', label: 'Heart Eyes' },
  { id: '😂', emoji: '�', label: 'Joy' },
  { id: '😢', emoji: '�', label: 'Crying' },
  { id: '😴', emoji: '�', label: 'Sleeping' },
  { id: '🤔', emoji: '🤔', label: 'Thinking' },
  { id: '👍', emoji: '👍', label: 'Like' },
  { id: '👎', emoji: '�', label: 'Dislike' },
  { id: '☕️', emoji: '☕️', label: 'Coffee' },
  { id: '🚀', emoji: '🚀', label: 'Rocket' },
]

const selectedOptions = ref<Array<VotingOption | undefined>>([])
const maxOptions = ref(props.maxNumberOfOptions)
const activeDropdown = ref<number | null>(null)

const availableOptions = computed(() => {
  return options.filter(x => !selectedOptions.value.includes(x))
})

const toggleDropdown = (idx: number) => {
  activeDropdown.value = activeDropdown.value === idx ? null : idx
}

const chooseOption = (idx: number, option: VotingOption) => {
  selectedOptions.value[idx] = option
  activeDropdown.value = null
  emit('options-changed', {
    selected: selectedOptions.value.filter(Boolean) as VotingOption[]
  })
}

const unselectOption = (idx: number) => {
  selectedOptions.value[idx] = undefined
  emit('options-changed', {
    selected: selectedOptions.value.filter(Boolean) as VotingOption[]
  })
}

const addOption = () => {
  maxOptions.value += 1
}

const reset = () => {
  selectedOptions.value = []
  maxOptions.value = props.maxNumberOfOptions
  emit('options-changed', {
    selected: []
  })
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('.dropdown')) {
    activeDropdown.value = null
  }
})
</script>

<style scoped>
.voting-configurator {
  margin-bottom: 2rem;
}

.buttons {
  flex-wrap: wrap;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 12rem;
}

.dropdown.is-active .dropdown-menu {
  display: block;
}

.dropdown-content {
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  padding: 4px 0;
}

.dropdown-item {
  color: #4a4a4a;
  display: block;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 3px 1rem;
  position: relative;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #363636;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
