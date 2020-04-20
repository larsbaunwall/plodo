<template>
  <div>
    <div class="buttons is-centered" v-if="latest != null">
      <a :href="latest.windows.path" class="button is-primary is-medium">
        <span class="icon">
          <i class="fab fa-windows" />
        </span>
        <span>
          Windows
          <span class="is-size-7">(v{{latest.version}})</span>
        </span>
      </a>
      <a :href="latest.macOS.path" class="button is-primary is-medium">
        <span class="icon">
          <i class="fab fa-apple" />
        </span>
        <span>
          MacOS
          <span class="is-size-7">(v{{latest.version}})</span>
        </span>
      </a>
    </div>
    <div v-else class="notification is-white-bis">
      Fetching the latest downloads from <strong><a href="https://github.com/larsbaunwall/plodo/releases">Github</a></strong>...
    </div>
  </div>
</template>

<script>
import ApiService from "@/common/ApiService";
export default {
  data() {
    return {
      latest: null
    };
  },
  async created() {
    const version = await ApiService.getLatestAppVersion();
    this.latest = version;
  }
};
</script>

<style>
</style>