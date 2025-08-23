<template>
  <div class="card">
    <div class="card-content">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="smiley level-item">
            <span class="icon is-large">
              <i style="font-size: 3rem;">{{ smiley }}</i>
            </span>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Total</p>
              <p class="title">{{ countFormatted }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  smiley: string
  count: number
}

const props = defineProps<Props>()

const countFormatted = computed(() => {
  if (props.count > 999) return `${(props.count / 1000).toFixed(2)}K`
  if (props.count > 9999) return `${(props.count / 10000).toFixed(1)}K`
  if (props.count > 999999) return `${(props.count / 10000).toFixed(2)}M`
  
  return props.count
})
</script>

<style scoped>
.card + .card {
  margin-top: 0.8rem;
}

.smiley {
  padding-right: 1rem;
}
</style>
