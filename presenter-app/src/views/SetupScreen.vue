<template>
  <div class="col">
    <div class="row mt-3">
      <div class="col">
        <div class="card w-100">
          <div class="card-body">
            <div class="card-title">
              <h5>Start a session</h5>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-center">
                <voting-configurator
                  :max-number-of-options="3"
                  @optionsChanged="handleOptionsChanged"
                />
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class>
                <button
                  block
                  icon="fa fa-play"
                  style="primary"
                  :disabled="votingOptions.length === 0"
                  @click="startSession"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row d-flex justify-content-center"
      style="margin-top: 10px;"
    >
      <img
        :src="require(`@/assets/artwork/icons/communication.svg`)"
        width="80%"
      >
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
      try {
        await this.$store.dispatchPromise("createSession", {
          votingOptions: this.votingOptions,
        });
        this.$router.push("/session");
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>

<style>
</style>
