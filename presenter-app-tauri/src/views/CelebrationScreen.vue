<template>
  <div class="celebration-overlay" ref="container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSessionStore } from '../stores/session'

interface Emoji {
  element: HTMLElement
  x: number
  y: number
  velocityX: number
  velocityY: number
  scale: number
  rotation: number
  rotationSpeed: number
}

const sessionStore = useSessionStore()
const { shouldCelebrate } = storeToRefs(sessionStore)

const emojis = ref<Emoji[]>([])
const animationId = ref<number>()
const gravity = 0.5
const container = ref<HTMLElement>()

// Animation loop
const animate = () => {
  updateEmojis()
  cleanupEmojis()
  animationId.value = requestAnimationFrame(animate)
}

const updateEmojis = () => {
  emojis.value.forEach(emoji => {
    // Update position
    emoji.x += emoji.velocityX
    emoji.y += emoji.velocityY
    
    // Apply gravity
    emoji.velocityY += gravity
    
    // Update scale and rotation
    emoji.scale *= 0.99
    emoji.rotation += emoji.rotationSpeed
    
    // Apply transforms
    emoji.element.style.transform = `translate(${emoji.x}px, ${emoji.y}px) scale(${emoji.scale}) rotate(${emoji.rotation}deg)`
  })
}

const cleanupEmojis = () => {
  emojis.value = emojis.value.filter(emoji => {
    if (emoji.scale < 0.1 || emoji.y > window.innerHeight + 100) {
      emoji.element.remove()
      return false
    }
    return true
  })
}

const addEmoji = (emojiChar: string) => {
  if (!container.value || !shouldCelebrate.value) return
  
  // Remove old emojis if too many
  if (emojis.value.length > 50) {
    const oldEmoji = emojis.value.shift()
    if (oldEmoji) oldEmoji.element.remove()
  }
  
  const element = document.createElement('div')
  element.textContent = emojiChar
  element.style.position = 'fixed'
  element.style.fontSize = '72px'
  element.style.pointerEvents = 'none'
  element.style.zIndex = '9999'
  element.style.userSelect = 'none'
  
  const margin = window.innerWidth * 0.1
  const x = Math.random() * (window.innerWidth - 2 * margin) + margin
  const y = window.innerHeight + 50
  
  const emoji: Emoji = {
    element,
    x,
    y,
    velocityX: (Math.random() - 0.5) * 8,
    velocityY: -(Math.random() * 15 + 10),
    scale: 1,
    rotation: 0,
    rotationSpeed: (Math.random() - 0.5) * 10
  }
  
  container.value.appendChild(element)
  emojis.value.push(emoji)
}

// Watch for voting events
watch(() => sessionStore.lastVote, (vote) => {
  if (vote) {
    addEmoji(vote.emoji)
  }
})

onMounted(() => {
  container.value = document.body
  if (shouldCelebrate.value) {
    animationId.value = requestAnimationFrame(animate)
  }
})

onUnmounted(() => {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
  // Clean up any remaining emojis
  emojis.value.forEach(emoji => emoji.element.remove())
})

// Start/stop animation based on celebration setting
watch(shouldCelebrate, (newValue) => {
  if (newValue && !animationId.value) {
    animationId.value = requestAnimationFrame(animate)
  } else if (!newValue && animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = undefined
    // Clean up emojis
    emojis.value.forEach(emoji => emoji.element.remove())
    emojis.value = []
  }
})
</script>

<style scoped>
.celebration-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
  background: transparent;
}

/* Ensure no background colors interfere with transparency */
:deep(html),
:deep(body) {
  background: transparent !important;
}
</style>
