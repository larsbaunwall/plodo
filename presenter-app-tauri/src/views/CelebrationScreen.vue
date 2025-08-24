<template>
  <div />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// @ts-ignore
import Two from 'two.js'
interface TwoShape {
  translation: { x: number; y: number; addSelf: (vector: any) => void }
  velocity: { x: number; y: number; addSelf: (vector: any) => void }
  scale: number
}

const emojis = ref<TwoShape[]>([])
const gravity = ref(new Two.Vector(0, -0.1))
const two = ref(
  new Two({
    type: Two.Types.canvas,
    fullscreen: true,
    autostart: true,
  })
)


onMounted(() => {
  // In Pinia, we would watch for vote events differently
  // For now, we'll add a simple demo that triggers on sessionStore changes
  // The real implementation would need to be connected to vote events

  two.value.appendTo(document.body)

  two.value.bind('update', function () {
    if (emojis.value) {
      for (let i = 0; i < emojis.value.length; i++) {
        const emoji = emojis.value[i]
        emoji.translation.addSelf(emoji.velocity)
        emoji.velocity.addSelf(gravity.value)
        emoji.scale = emoji.scale * 0.99
      }
    }
  })
})
</script>

<style></style>
