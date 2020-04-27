<template>
  <div>
    <span :class="sessionStream.connected ? 'has-text-success' : 'has-text-danger'">{{ sessionStream.connected ? 'Connected' : 'Connecting...' }}</span>&nbsp;<button
      class="button is-small is-outline"
      @click="connectEventStream()"
    >
      <b-icon
        icon="undo"
        size="is-small"
      /><span>Reconnect</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["sessionStream"]),
  },
  methods: {
    connectEventStream() {
      this.$store.dispatch("connectSessionStream");
    },
  },
};
</script>

<style>
</style>
