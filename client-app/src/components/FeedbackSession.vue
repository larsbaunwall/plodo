<template>
  <div>
    <div v-for="opt in activeSession.options" :key="opt">
      <button @click="vote(opt)">
        <i :class="`twa twa-30px ${opt}`" />&nbsp;{{opt}}
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
  mounted() {
      sse = new EventSource(`https://api-qa.plodo.io/session-stream?access_token=${this.$store.getters.accessToken}`, {withCredentials: true});
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