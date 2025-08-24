<template>
  <div />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// @ts-ignore
import Two from 'two.js'
// @ts-ignore
import { parse } from 'twemoji-parser'

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

const addEmoji = (emojiPng: string) => {
  // Remove emojis outside viewport
  for (let i = 0; i < emojis.value.length; i++) {
    const emoji = emojis.value[i]
    if (emoji.scale < 0.1 || emoji.translation.y < 0) {
      two.value.scene.remove(emoji)
      emojis.value.splice(i, 1)
    }
  }

  const m = two.value.width * 0.1 // margin
  const w = two.value.width - 8 * m

  const x = Math.random() * w + 7 * m
  const y = two.value.height * 1.0

  const shape = two.value.makeSprite(emojiPng, 72, 72) as TwoShape
  shape.velocity = new Two.Vector()
  shape.velocity.x = 4 * (Math.random() - 0.7)
  shape.velocity.y = -(Math.random() * 1)

  shape.scale = 1

  shape.translation.x = x
  shape.translation.y = y

  two.value.add(shape)
  emojis.value.push(shape)
}

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
