<template>
  <div class="smiley-counter">
    <div class="counter-content">
      <div class="emoji-section">
        <Twemoji :emoji="smiley" css-class="emoji-large" />
      </div>
      
      <div class="stats-section">
        <div class="rate-stat">
          <div class="stat-label">Rate</div>
          <div class="stat-value">
            <n-icon 
              v-if="trend !== 0"
              :component="trend > 0 ? TrendingUpOutline : TrendingDownOutline"
              :class="trend > 0 ? 'trend-up' : 'trend-down'"
              size="small"
            />
            {{ currentRate }}<span class="unit">/m</span>
          </div>
        </div>
        
        <div class="total-stat">
          <div class="stat-label">Total</div>
          <div class="stat-value">{{ countFormatted }}</div>
        </div>
      </div>
      
      <div class="chart-section">
        <div class="sparkline" ref="sparklineRef"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { NIcon } from 'naive-ui';
import { TrendingUpOutline, TrendingDownOutline } from '@vicons/ionicons5';
import Twemoji from './Twemoji.vue';

interface Props {
  smiley: string;
  count: number;
}

const props = defineProps<Props>();

const sparklineRef = ref<HTMLElement>();
const historical = ref<Array<{ count: number; timestamp: number; changeRate: number }>>([]);
const currentRate = ref(0);
const trend = ref(0);
const animationFrame = ref<number>();

const periodMs = 60000; // 1 minute

const countFormatted = computed(() => {
  if (props.count > 999999) return `${(props.count / 1000000).toFixed(2)}M`;
  if (props.count > 9999) return `${(props.count / 1000).toFixed(1)}K`;
  if (props.count > 999) return `${(props.count / 1000).toFixed(2)}K`;
  return props.count.toString();
});

function updateData(timestamp: number) {
  const latestPeriod = historical.value.filter(
    x => x.timestamp > timestamp - periodMs
  );

  const startOfPeriod = latestPeriod[0]?.count || 0;
  const endOfPeriod = latestPeriod[latestPeriod.length - 1]?.count || 0;
  currentRate.value = endOfPeriod - startOfPeriod;

  const trendPeriod = historical.value.filter(
    x => x.timestamp > timestamp - 5000
  );
  trend.value = 
    (trendPeriod[trendPeriod.length - 1]?.changeRate || 0) -
    (trendPeriod[0]?.changeRate || 0);

  historical.value.push({
    count: props.count || 0,
    timestamp: timestamp,
    changeRate: currentRate.value,
  });

  // Keep only recent data
  historical.value = historical.value.filter(x => x.timestamp > timestamp - periodMs);

  animationFrame.value = requestAnimationFrame(updateData);
}

onMounted(() => {
  animationFrame.value = requestAnimationFrame(updateData);
});

onUnmounted(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});

watch(() => props.count, () => {
  // Update will happen in the next animation frame
});
</script>

<style scoped>
.smiley-counter {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.counter-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.emoji-section {
  flex-shrink: 0;
}

.stats-section {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
}

.rate-stat,
.total-stat {
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1B1464;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.unit {
  font-size: 0.7rem;
  color: #666;
}

.trend-up {
  color: #22D56D;
}

.trend-down {
  color: #F02B5C;
}

.chart-section {
  flex-shrink: 0;
  width: 150px;
  height: 60px;
}

.sparkline {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #2E3192, #FFF);
  border-radius: 4px;
  opacity: 0.3;
}

:deep(.emoji-large) {
  width: 3rem;
  height: 3rem;
}
</style>
