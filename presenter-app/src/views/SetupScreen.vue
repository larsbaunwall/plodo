<template>
  <div>
    <section class="section has-text-centered">
      <img
        id="welcomeBanner"
        :src="require(`@/assets/artwork/icons/communication.svg`)"
        width="80%"
      />
    </section>
    <section class="section">
      <div class="container has-text-centered is-mobile">
        <h1 class="title has-text-secondary is-3">Welcome to plodo</h1>
        <h2 class="subtitle">Set up a new feedback session:</h2>
        <voting-configurator :max-number-of-options="3" @optionsChanged="handleOptionsChanged" />
        <button
          class="button is-success is-rounded is-large"
          :disabled="votingOptions.length === 0"
          @click="startSession"
        >
          <b-icon icon="play" size="is-small" />
          <span>Start session</span>
        </button>
      </div>
    </section>
    <section class="section has-text-centered has-text-grey-light">
      <div class="content is-size-7">
        <p>Plodo is free, if you like it, please consider <a class="has-text-grey" href="https://paypal.me/larslb" target="_blank" @click.prevent="openExternalBrowser">supporting</a> us.
        <br/>Read more about plodo at
        <a class="has-text-grey" href="https://www.plodo.io" target="_blank" @click.prevent="openExternalBrowser">https://www.plodo.io</a></p>
      </div>
    </section>
  </div>
</template>

<script>
import VotingConfigurator from "@/components/VotingConfigurator";
import { remote } from "electron";
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
    openExternalBrowser(e) {
      remote.shell.openExternal(e.target.href);
    },
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

<style scoped>
h1.title {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
