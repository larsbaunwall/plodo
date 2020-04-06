<template>
  <div>
    <div>
      <i :class="`twa twa-30px ${smiley}`" />
      {{ count }}
      <sparkline>
        <sparklineLine
          :has-spot="true"
          :limit="spData.length"
          :data="spData"
          :ref-line-type="false"
        />
      </sparkline>
      {{ currentChangeRate }}/s
    </div>
  </div>
</template>

<script>
import Sparkline from "vue-sparklines";
export default {
  name: "SmileyCounter",
  components: {
    Sparkline,
  },
  props: {
    smiley: String,
    count: Number,
  },
  data() {
    return {
      spData: (() => {
        return Array.from({length: 30},
          () => 0);
      })(),
      historical: [],
      currentChangeRate: 0
    };
  },
  mounted() {
    setInterval(() => {
      const periodMs = 5000;

      const now = Date.now();

      const lastSecond = this.historical.filter(x => x.timestamp > now - periodMs);
      this.currentChangeRate = (lastSecond[lastSecond.length - 1]?.count || 0) - (lastSecond[0]?.count || 0) || 0;

      this.historical.push({count: this.count || 0, timestamp: now, changeRate: this.currentChangeRate});

      this.spData = this.historical.filter(x => x.timestamp > now - 10000).map(x => x.changeRate);
    }, 1000);
  },
};
</script>

<style>
</style>
