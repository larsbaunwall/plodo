<template>
  <div>
    <div class="tags has-addons">
      <span
        :class="sessionStream.connected ? 'tag is-success' : 'tag is-danger'"
      >{{ sessionStream.connected ? 'Connected' : 'Connecting...' }}</span>
      <span class="tag connectBtn" @click="connectEventStream()" title="Reconnect">
        <b-icon icon="undo" size="is-small" />
      </span>
    </div>
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
.connectBtn {
  cursor: pointer;
}
</style>
