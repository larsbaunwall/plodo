<template>
  <div
    id="app"
    class="is-clipped"
  >
    <tab-menu />
    <section class="main-section section is-fullheight">
      <router-view />
    </section>
    <footer class="footer has-background-primary">
      <div class="content has-text-centered">
        <img
          id="footer-logo"
          src="@/assets/artwork/logo.png"
          width="75px"
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
    flex: 1 1 auto;
    overflow-y: auto;
    height: 0px;
    padding: 1rem 1.5rem;
}

footer {
  padding: 0.5rem 1.5rem 0.5rem;
}

#footer-logo {
  filter: saturate(0%) contrast(0%) brightness(200%);
  opacity: 0.5;
}
</style>
