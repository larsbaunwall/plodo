<template>
  <div>
    <div class="buttons is-centered" v-if="latestDownload != null">
      <a :href="latestDownload.windows.path" class="button is-primary is-medium">
        <span class="icon">
          <i class="fab fa-windows" />
        </span>
        <span>
          Windows
          <span class="is-size-7">(v{{latestDownload.version}})</span>
        </span>
      </a>
      <a :href="latestDownload.macOS.path" class="button is-primary is-medium">
        <span class="icon">
          <i class="fab fa-apple" />
        </span>
        <span>
          MacOS
          <span class="is-size-7">(v{{latestDownload.version}})</span>
        </span>
      </a>
    </div>
    <div v-else class="notification is-white-bis">
      Fetching the latest downloads from <strong><a href="https://github.com/larsbaunwall/plodo/releases">Github</a></strong>...
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["latestDownload"])
    },
    mounted() {
        this.$store.dispatch("fetchLatestAppDownload");
    },
};
</script>

<style>
</style>