<template>
  <div class="card w-100">
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <div class="d-flex flex-row align-items-center">
            <div class="">
              <i :class="`twa twa-30px twa-${smiley}`" />
            </div>
            <div class="p-2 d-flex flex-column">
              <div class="subtitle font-weight-bold text-uppercase">Rate</div>
              <div class="text-weight-bold">{{ currentChangeRate }}<span class="text-muted subtitle-unit">/min</span></div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <trend
            class="card-img-top"
            :data="spData"
            :gradient="['#5603ad', '#FFF']"
            gradient-direction="right"
            :smooth="true"
            :radius="50"
            stroke-width="2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmileyCounter",
  components: {},
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
      currentChangeRate: 0,
    };
  },
  mounted() {
    setInterval(() => {
      const periodMs = 60000;
      const now = Date.now();

      const lastPeriod = this.historical.filter(
        x => x.timestamp > now - periodMs
      );
      this.currentChangeRate =
        (lastPeriod[lastPeriod.length - 1]?.count || 0) -
        (lastPeriod[0]?.count || 0);

      this.historical.push({
        count: this.count || 0,
        timestamp: now,
        changeRate: this.currentChangeRate,
      });

      this.spData = this.historical
        .filter(x => x.timestamp > now - periodMs)
        .map(x => x.changeRate);
    }, 1000);
  },
};
</script>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}

.subtitle {
  font-size: 0.5rem;
}

.subtitle-unit {
  font-size: 0.7rem;
}
</style>
