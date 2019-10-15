<template>
  <div style="padding: 10px;">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <voting-configurator :maxNumberOfOptions="3" v-on:optionsChanged="handleOptionsChanged" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <div class="form-group">
          <base-switch :value="celebrateOnScreen" />
        </div>
      </div>
      <div class="col-10">
        <div class="form-group">Celebrate on screen</div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <base-button block style="primary" @click="startSession">Start</base-button>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <img src="@/assets/artwork/logo.png" width="100px" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import VotingConfigurator from "@/components/VotingConfigurator";
export default {
  components: {
    VotingConfigurator
  },
  data() {
    return {
      selectedOptions: [],
      celebrateOnScreen: false
    };
  },
  methods: {
    handleOptionsChanged(args) {
      this.selectedOptions = [...args.selectedOptions];
    },
    startSession() {
      this.$store.dispatch("createSession", this.selectedOptions);
    }
  }
};
</script>

<style>
</style>
