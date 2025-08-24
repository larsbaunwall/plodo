<template>
  <div class="card">
    <div class="card-content">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="smiley level-item">
            <Twemoji :emojis="smiley" cssClass="twa twa-3x" />
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Rate</p>
              <p class="title">
                <b-icon
                  v-if="trend !== 0"
                  :icon="trend > 0 ? 'angle-up' : 'angle-down'"
                  size="is-small"
                  :class="
                    trend > 0
                      ? 'trend has-text-success'
                      : 'trend has-text-danger'
                  "
                />{{ currentRate }}<span class="subtitle-unit">/m</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Total</p>
              <p class="title">
                {{ countFormatted }}
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <!-- Placeholder for trend chart - would need to add chart library -->
            <div class="trend-chart">
              <b-icon
                :icon="trendIcon"
                :type="trendType"
                size="is-medium"
                v-if="showTrend"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import Twemoji from './Twemoji.vue'

interface Props {
  smiley: string
  count: number
}

const props = defineProps<Props>()

// Data for tracking historical counts and calculating rates
const spData = ref<number[]>(Array.from({ length: 60 }, () => 0))
const historical = ref<
  Array<{
    count: number
    timestamp: number
    changeRate: number
  }>
>([])
const currentRate = ref(0)
const periodMs = 60000
const trend = ref(0)
let animationFrame: number | undefined

const countFormatted = computed(() => {
  if (props.count > 999999) return `${(props.count / 1000000).toFixed(2)}M`
  if (props.count > 9999) return `${(props.count / 1000).toFixed(1)}K`
  if (props.count > 999) return `${(props.count / 1000).toFixed(2)}K`

  return props.count
})

const showTrend = computed(() => {
  return historical.value.length > 1
})

const trendIcon = computed(() => {
  if (!showTrend.value) return ''

  if (trend.value > 0) return 'trending-up'
  if (trend.value < 0) return 'trending-down'
  return 'trending-neutral'
})

const trendType = computed(() => {
  if (!showTrend.value) return ''

  if (trend.value > 0) return 'is-success'
  if (trend.value < 0) return 'is-danger'
  return 'is-info'
})

const updateData = (timestamp: number) => {
  const latestPeriod = historical.value.filter(
    x => x.timestamp > timestamp - periodMs
  )

  const startOfPeriod = latestPeriod[0]?.count || 0
  const endOfPeriod = latestPeriod[latestPeriod.length - 1]?.count || 0
  currentRate.value = endOfPeriod - startOfPeriod

  const trendPeriod = historical.value.filter(
    x => x.timestamp > timestamp - 5000
  )
  trend.value =
    (trendPeriod[trendPeriod.length - 1]?.changeRate || 0) -
    (trendPeriod[0]?.changeRate || 0)

  historical.value.push({
    count: props.count || 0,
    timestamp: timestamp,
    changeRate: currentRate.value,
  })

  spData.value = historical.value
    .filter(x => x.timestamp > timestamp - periodMs)
    .filter((_, idx) => idx % 2 == 0)
    .map(x => x.changeRate)

  animationFrame = window.requestAnimationFrame(updateData)
}

onMounted(() => {
  animationFrame = window.requestAnimationFrame(updateData)
})

onUnmounted(() => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = undefined
  }
})
</script>

<style scoped>
.subtitle-unit {
  font-size: 0.7rem;
}

.card + .card {
  margin-top: 0.8rem;
}

.trend {
  position: relative;
  margin-left: -1rem;
}

.smiley {
  padding-right: 1rem;
}

.trend-chart {
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
