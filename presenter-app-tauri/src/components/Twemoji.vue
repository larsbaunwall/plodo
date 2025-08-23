<template>
  <span :class="cssClass">{{ emojis }}</span>
</template>

<script setup lang="ts">
interface Props {
  emojis: string
  cssClass?: string
}

withDefaults(defineProps<Props>(), {
  cssClass: 'twa twa-1x'
})
</script>

<style scoped>
.twa {
  display: inline-block;
  font-style: normal;
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
