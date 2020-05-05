<template>
  <div>
    <div v-if="sessionStream.connected" class="tags has-addons">
      <span
        :class="sessionStream.connected ? 'tag is-success' : 'tag is-danger'"
      >{{ sessionStream.connected ? 'Connected' : 'Connecting...' }}</span>
      <span
        class="tag has-background-grey-lighter has-text-primary connectBtn"
        @click="connectEventStream()"
        title="Reconnect"
      >
        <b-icon icon="undo" size="is-small" />
      </span>
    </div>
    <div v-else class="tags has-addons">
      <span
        class="tag is-success"
      >Ready</span>
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
