<template>
  <div>
    <button
      class="button is-large is-primary is-outlined is-fullwidth"
      style="margin-bottom: 1em; height: 5em"
      v-for="opt in activeSession.options"
      :key="opt"
      :title="formatOption(opt)"
      @click="vote(opt)"
    >
      <span class>
        <i :class="`twa twa-3x twa-${opt}`" />
      </span>
    </button>
    <hr />
    <p class="has-text-grey-lighter">Your are playing in session <code class="has-text-primary">{{sessionId}}</code></p>
    <button
      style="margin-top: 1em;"
      class="button is-outlined is-fullwidth"
      @click="leaveSession()"
    >
      <span class="icon">
        <i class="fas fa-sign-out-alt" />
      </span>
      <span>Leave session</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    sessionId: String
  },
  methods: {
    vote(vote) {
      this.$store.dispatch("castVote", { vote: vote });
    },
    leaveSession() {
      this.$store
        .dispatch("removeActiveSession")
        .then(() => this.$router.push({ name: "Start" }));
    },
    formatOption(opt) {
      return opt.replace("-", " ");
    }
  },
  computed: {
    ...mapGetters(["activeSession"])
  }
};
</script>

<style scoped>
</style>