<template>
  <div id="app">
    <top-bar />
    <div class="main">
      <router-view />
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <img src="@/assets/artwork/logo.png" width="100px" />
      </div>
    </footer>
  </div>
</template>
<script>
import TopBar from "./components/TopBar"
export default {
  components: {
    TopBar
  }
}
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
</style>
