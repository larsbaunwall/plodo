<template>
  <div class="voting-configurator">
    <div class="buttons is-centered">
      <template v-for="(_, idx) in maxOptions" :key="idx">
        <button
          v-if="selectedOptions[idx] !== undefined"
          class="button is-outline is-large"
          @click="unselectOption(idx)"
        >
          <span style="font-size: 1.5rem"
            ><Twemoji :emojis="selectedOptions[idx].emoji"
          /></span>
        </button>
        <b-dropdown v-else aria-role="list">
          <template #trigger>
            <button class="button is-outline is-large">
              <b-icon icon="question" class="has-text-lightblue-darker" />
            </button>
          </template>
          <b-dropdown-item
            v-for="opt in availableOptions"
            :key="opt.id"
            aria-role="listitem"
            @click="chooseOption(idx, opt)"
          >
            <span style="font-size: 1.2rem"
              ><Twemoji :emojis="opt.emoji"
            /></span>
            <span class="ml-2">{{ opt.label }}</span>
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <button
        v-if="addingAllowed"
        class="button is-large is-outline"
        title="Add one more"
        @click="addOption"
      >
        <b-icon icon="plus" class="has-text-secondary" />
      </button>
      <button
        v-if="selectedOptions.filter(Boolean).length > 0"
        class="button is-large is-outline"
        title="Start over"
        @click="reset"
      >
        <b-icon icon="undo" class="has-text-secondary" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Twemoji from './Twemoji.vue'

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
  addingAllowed: true,
})

const emit = defineEmits<{
  'options-changed': [data: { selected: VotingOption[] }]
}>()

const options: VotingOption[] = [
  { id: '😀', emoji: '😀', label: 'Smile' },
  { id: '😡', emoji: '😡', label: 'Pouting' },
  { id: '❤️', emoji: '❤️', label: 'Love' },
  { id: '😍', emoji: '😍', label: 'Heart Eyes' },
  { id: '😂', emoji: '😂', label: 'Joy' },
  { id: '😢', emoji: '😢', label: 'Crying' },
  { id: '😴', emoji: '😴', label: 'Sleeping' },
  { id: '🤔', emoji: '🤔', label: 'Thinking' },
  { id: '👍', emoji: '👍', label: 'Like' },
  { id: '👎', emoji: '👎', label: 'Dislike' },
  { id: '☕️', emoji: '☕️', label: 'Coffee' },
  { id: '�', emoji: '�', label: 'Poo' },
  { id: '🦅', emoji: '🦅', label: 'Eagle' },
]

const selectedOptions = ref<Array<VotingOption | undefined>>([])
const maxOptions = ref(props.maxNumberOfOptions)

const availableOptions = computed(() => {
  return options.filter(x => !selectedOptions.value.includes(x))
})

const chooseOption = (idx: number, option: VotingOption) => {
  selectedOptions.value[idx] = option
  emit('options-changed', {
    selected: selectedOptions.value.filter(Boolean) as VotingOption[],
  })
}

const unselectOption = (idx: number) => {
  selectedOptions.value[idx] = undefined
  emit('options-changed', {
    selected: selectedOptions.value.filter(Boolean) as VotingOption[],
  })
}

const addOption = () => {
  maxOptions.value += 1
}

const reset = () => {
  selectedOptions.value = []
  maxOptions.value = props.maxNumberOfOptions
  emit('options-changed', {
    selected: [],
  })
}
</script>

<style scoped>
.voting-configurator {
  margin-bottom: 2rem;
}

.buttons {
  flex-wrap: wrap;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
