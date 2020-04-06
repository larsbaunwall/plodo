<template>
  <div>
    <div v-for="opt in activeSession.options" :key="opt">
      <button @click="vote(opt)">
        <img :src="require(`@/assets/artwork/emojis/svg/${opt}.svg`)" width="30px" height="30px" />&nbsp;{{opt}}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

let sse = null;

export default {
  props: {
    votingOptions: []
  },
  mounted() {
      sse = new EventSource(`https://localhost:5001/session-stream?access_token=${this.$store.getters.accessToken}`, {withCredentials: true});
      sse.addEventListener("vote", msg => {
        console.log("RCV: ", {msg});
      });
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