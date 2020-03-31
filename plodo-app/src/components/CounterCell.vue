<template>
  <div
    class="counter-cell flex-fill d-inline-flex justify-content-center align-items-center"
    :class="getClass"
  >
    <i
      class="flex"
      :class="icon"
    />&nbsp;<h1 class="flex">
      {{ count }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "CounterCell",
  props: {
    count: Number,
    type: String,
    icon: String
  },
  computed: {
    getClass() {
      return {
        up: this.type === "up",
        down: this.type === "down",
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.up {
  background-color: $green;
}

.down {
  background-color: $red;
}
</style>