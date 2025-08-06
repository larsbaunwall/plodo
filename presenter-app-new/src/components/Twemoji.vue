<template>
  <span class="twemoji-container">
    <span 
      v-for="(style, index) in emojiStyles" 
      :key="index"
      :class="cssClass"
      :style="style"
      class="twemoji-emoji"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { parse } from 'twemoji-parser';

interface Props {
  emoji: string;
  cssClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  cssClass: 'twemoji-default'
});

const emojiStyles = computed(() => {
  const parsed = parse(props.emoji);
  return parsed.map((e: any) => ({
    backgroundImage: `url('${e.url}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'inline-block',
    width: '1em',
    height: '1em'
  }));
});
</script>

<style scoped>
.twemoji-container {
  display: inline-block;
}

.twemoji-emoji {
  vertical-align: middle;
}

.twemoji-default {
  width: 1.2em;
  height: 1.2em;
}
</style>
