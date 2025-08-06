<template>
  <div class="voting-configurator">
    <div class="options-grid">
      <template v-for="(_, idx) in maxOptions" :key="idx">
        <div v-if="selectedOptions[idx]" class="option-selected">
          <n-button 
            size="large"
            @click="unselectOption(idx)"
            class="emoji-button selected"
          >
            <Twemoji :emoji="selectedOptions[idx].id" />
          </n-button>
        </div>
        <div v-else class="option-empty">
          <n-dropdown 
            :options="dropdownOptions"
            @select="(key: string) => chooseOption(idx, key)"
          >
            <n-button size="large" class="emoji-button empty">
              <template #icon>
                <n-icon :component="HelpOutline" />
              </template>
            </n-button>
          </n-dropdown>
        </div>
      </template>
      
      <div v-if="addingAllowed" class="option-add">
        <n-button 
          size="large"
          @click="addOption"
          class="emoji-button add"
          title="Add one more"
        >
          <template #icon>
            <n-icon :component="AddOutline" />
          </template>
        </n-button>
      </div>
      
      <div v-if="selectedOptions.length > 0" class="option-reset">
        <n-button 
          size="large"
          @click="reset"
          class="emoji-button reset"
          title="Start over"
        >
          <template #icon>
            <n-icon :component="RefreshOutline" />
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NButton, NDropdown, NIcon } from 'naive-ui';
import { HelpOutline, AddOutline, RefreshOutline } from '@vicons/ionicons5';
import Twemoji from './Twemoji.vue';

interface VotingOption {
  id: string;
  name: string;
}

interface Props {
  maxNumberOfOptions: number;
  addingAllowed: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  optionsChanged: [event: { selected: VotingOption[] }];
}>();

const options: VotingOption[] = [
  { id: "😀", name: "Smile" },
  { id: "😡", name: "Pouting" },
  { id: "❤️", name: "Love" },
  { id: "👍", name: "Like" },
  { id: "👎", name: "Dislike" },
  { id: "☕️", name: "Coffee" },
  { id: "💩", name: "Poo" },
  { id: "🦅", name: "Eagle" },
];

const selectedOptions = ref<(VotingOption | undefined)[]>([]);
const maxOptions = ref(props.maxNumberOfOptions);

const dropdownOptions = computed(() => {
  const selectedIds = selectedOptions.value.filter(Boolean).map(opt => opt!.id);
  return options
    .filter(opt => !selectedIds.includes(opt.id))
    .map(opt => ({
      label: `${opt.id} ${opt.name}`,
      key: opt.id
    }));
});

function chooseOption(idx: number, emojiId: string) {
  const option = options.find(opt => opt.id === emojiId);
  if (option) {
    selectedOptions.value[idx] = option;
    emitChange();
  }
}

function unselectOption(idx: number) {
  selectedOptions.value[idx] = undefined;
  emitChange();
}

function addOption() {
  maxOptions.value += 1;
}

function reset() {
  selectedOptions.value = [];
  maxOptions.value = props.maxNumberOfOptions;
  emitChange();
}

function emitChange() {
  emit('optionsChanged', {
    selected: selectedOptions.value.filter(Boolean) as VotingOption[]
  });
}
</script>

<style scoped>
.voting-configurator {
  display: flex;
  justify-content: center;
}

.options-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.emoji-button {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  font-size: 2rem;
}

.emoji-button.selected {
  border: 2px solid #1B1464;
}

.emoji-button.empty {
  border: 2px dashed #ccc;
  color: #999;
}

.emoji-button.add,
.emoji-button.reset {
  border: 2px solid #2E3192;
  color: #2E3192;
}
</style>
