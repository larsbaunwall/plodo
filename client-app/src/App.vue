<template>
  <div id="app">
    <github-ribbon />
    <top-bar />
    <div class="main">
      <router-view />
    </div>
    <footer class="footer has-background-primary">
      <div class="content has-text-centered">
        <img id="footer-logo" src="@/assets/artwork/logo.png" width="100px" />
      </div>
    </footer>
    <cookie-consent>
  <template
    slot="button"
  >
    <button class="button is-success">Accept</button>
  </template>
</cookie-consent>
  </div>
</template>
<script>
import TopBar from "./components/TopBar";
import GithubRibbon from "./components/GithubRibbon"
import CookieConsent from "vue-cookieconsent-component"
export default {
  components: {
    TopBar,
    GithubRibbon,
    CookieConsent,
  },
  mounted() {
    this.$appInsights.trackEvent({name: 'App started', properties: { version: this.$store.getters.appVersion }});
  },
};
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

footer {
  flex: 1;
}

#footer-logo {
  filter: saturate(0%) contrast(0%) brightness(200%);
  opacity: 0.1;
}
</style>
