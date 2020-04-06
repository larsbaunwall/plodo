<template>
  <div style="padding: 10px;">
    <div class="row">
      <div class="col-12">
        <h2>Session active {{ activeSession.id }}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <smiley-counter
          v-for="opt in activeSession.options"
          :key="opt.id"
          :smiley="opt.id"
          :count="opt.count"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <base-button
            block
            style="primary"
            @click="quitSession"
          >
            Quit session
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmileyCounter from "@/components/SmileyCounter.vue";
export default {
  components: { SmileyCounter },
  computed: {
    ...mapGetters(["activeSession"])
  },
  methods: {
    async quitSession () {
      await this.$store.dispatch("removeActiveSession");
      this.$router.push("/");
    }
  }
};
</script>

<style>

</style>
