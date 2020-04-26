<template>
  <div
    class="container has-text-centered is-mobile"
    style="padding: -3rem;"
  >
    <img
      :src="require(`@/assets/artwork/icons/communication.svg`)"
      width="80%"
    >
    <div class="card">
      <div class="card-content">
        <h1 class="title has-text-secondary is-3">
          Start a session
        </h1>
        <h2 class="subtitle">
          Select voting options:
        </h2>
        <voting-configurator
          :max-number-of-options="3"
          @optionsChanged="handleOptionsChanged"
        />
        <button
          class="button is-success is-rounded"
          :disabled="votingOptions.length === 0"
          @click="startSession"
        >
          <b-icon
            icon="play"
            size="is-small"
          /><span>Start</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VotingConfigurator from "@/components/VotingConfigurator";
export default {
  components: {
    VotingConfigurator,
  },
  data() {
    return {
      votingOptions: [],
    };
  },
  methods: {
    handleOptionsChanged(args) {
      this.votingOptions = args.selected;
    },
    async startSession() {
      await this.$store.dispatchPromise("createSession", {
        votingOptions: this.votingOptions,
      });
      this.$router.push({ name: "PlayingSession" });
    },
  },
};
</script>

<style>
</style>
