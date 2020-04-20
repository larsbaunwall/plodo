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
  </div>
</template>
<script>
import TopBar from "./components/TopBar";
import GithubRibbon from "./components/GithubRibbon"
export default {
  components: {
    TopBar,
    GithubRibbon
  }
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
