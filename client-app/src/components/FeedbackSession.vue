<template>
  <div>
    <div v-for="opt in activeSession.options" :key="opt">
      <button class="button is-large " @click="vote(opt)">
        <i :class="`twa twa-30px twa-${opt}`" />&nbsp;{{opt}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// eslint-disable-next-line no-unused-vars
let sse = null;

export default {
  props: {
    votingOptions: []
  },
  methods: {
    vote(vote) {
      this.$store.dispatch("castVote", {vote: vote})
    },
  },
  computed: {
    ...mapGetters(["activeSession"])
  }
};
</script>

<style>
</style>