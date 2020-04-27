<template>
  <div class="card">
    <div class="card-content">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <twemoji
              :emojis="smiley"
              css-class="twa twa-3x"
            />
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                Rate
              </p>
              <p class="title">
                <b-icon
                  v-if="trend !== 0"
                  :icon="trend > 0 ? 'angle-up' : 'angle-down'"
                  size="is-small"
                  :class="trend > 0 ? 'has-text-success' : 'has-text-danger'"
                />{{ currentRate }}<span class="subtitle-unit">/m</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">
                Total
              </p>
              <p class="title">
                {{ countFormatted }}
              </p>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <trend
              :data="spData"
              :gradient="['#2E3192', '#FFF']"
              gradient-direction="right"
              :smooth="true"
              :radius="100"
              :width="150"
              stroke-width="2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Twemoji from "./Twemoji";
export default {
  name: "SmileyCounter",
  components: {
    Twemoji,
  },
  props: {
    smiley: String,
    count: Number,
  },
  data() {
    return {
      spData: (() => {
        return Array.from({ length: 60 }, () => 0);
      })(),
      historical: [],
      currentRate: 0,
      periodMs: 60000,
      animationFrame: undefined,
      trend: 0,
    };
  },
  computed: {
    countFormatted() {
      if (this.count > 999) return `${(this.count / 1000).toFixed(2)}K`;
      if (this.count > 9999) return `${(this.count / 10000).toFixed(1)}K`;
      if (this.count > 999999) return `${(this.count / 10000).toFixed(2)}M`;

      return this.count;
    },
  },
  created() {
    this.animationFrame = window.requestAnimationFrame(t =>
      this.updateData(t, this)
    );
  },

  destroyed() {
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = undefined;
  },

  methods: {
    updateData: (timestamp, self) => {
      const latestPeriod = self.historical.filter(
        x => x.timestamp > timestamp - self.periodMs
      );

      const startOfPeriod = latestPeriod[0]?.count || 0;
      const endOfPeriod = latestPeriod[latestPeriod.length - 1]?.count || 0;
      self.currentRate = endOfPeriod - startOfPeriod;

      const trendPeriod = self.historical.filter(
        x => x.timestamp > timestamp - 5000
      );
      self.trend =
				trendPeriod[trendPeriod.length - 1]?.changeRate -
				trendPeriod[0]?.changeRate;

      self.historical.push({
        count: self.count || 0,
        timestamp: timestamp,
        changeRate: self.currentRate,
      });

      self.spData = self.historical
        .filter(x => x.timestamp > timestamp - self.periodMs)
        .filter((x, idx) => (idx % 2) == 0)
        .map(x => x.changeRate);

      window.requestAnimationFrame(t => self.updateData(t, self));
    },
  },
};
</script>

<style scoped>
.subtitle-unit {
	font-size: 0.7rem;
}

.card + .card {
  margin-top: 0.8rem;
}
</style>
