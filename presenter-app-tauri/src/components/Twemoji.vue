<template>
  <span>
    <!-- For now, just render the emoji directly until twemoji-parser types are resolved -->
    <span :class="cssClass">{{ emojis }}</span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  emojis: string
  cssClass?: string
}

withDefaults(defineProps<Props>(), {
  cssClass: 'twa twa-30px',
})

// Note: The original used twemoji-parser to convert to images
// This simplified version just renders the emoji directly
// TODO: Properly integrate twemoji-parser with TypeScript types
</script>

<style scoped>
.twa {
  display: inline-block;
  font-style: normal;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 1em;
  height: 1em;
}

.twa-1x {
  font-size: 1em;
}

.twa-30px {
  font-size: 30px;
}

.twa-3x {
  font-size: 3em;
}
</style>
