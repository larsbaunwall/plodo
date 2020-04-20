<template>
  <div class="buttons is-centered" v-if="latest != null">
    <a :href="latest.windows.path" class="button is-primary is-medium">
      <span class="icon">
        <i class="fab fa-windows" />
      </span>
      <span>Windows <span class="is-size-7">(v{{latest.version}})</span></span>
    </a>
    <a :href="latest.macOS.path" class="button is-primary is-medium">
      <span class="icon">
        <i class="fab fa-apple" />
      </span>
      <span>MacOS <span class="is-size-7">(v{{latest.version}})</span></span>
    </a>
  </div>
</template>

<script>
import ApiService from "@/common/ApiService";
export default {
    data() {
        return {
            latest: null
        }
    },
    async mounted() {
        const version = await ApiService.getLatestAppVersion();
        this.latest = version;
    }
};
</script>

<style>
</style>