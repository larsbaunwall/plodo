<template>
  <div
    id="app"
  >
    <tab-menu />
    <section class="main-section section">
      <router-view />
    </section>
    <footer class="footer has-background-primary">
      <div class="content has-text-centered">
        <img
          id="footer-logo"
          src="@/assets/artwork/logo.png"
          width="100px"
        >
      </div>
    </footer>
  </div>
</template>
<script>
import TabMenu from "../components/TabMenu";
export default {
  components: {
    TabMenu,
  }
};
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main-section {
  padding-top: 0rem;
}

footer {
  flex: 1;
}

#footer-logo {
  filter: saturate(0%) contrast(0%) brightness(200%);
  opacity: 0.1;
}
</style>
