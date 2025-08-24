<template>
  <div id="app" class="is-clipped">
    <tab-menu />
    <section class="main-section section is-fullheight">
      <router-view />
    </section>
    <footer class="footer has-background-white-ter">
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <img
              id="footer-logo"
              src="../assets/artwork/logo.png"
              width="50px"
            />
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <session-health />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TabMenu from '../components/TabMenu.vue'
import SessionHealth from '../components/SessionHealth.vue'
</script>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fafafa; /* white-bis equivalent */
}

.main-section {
  flex: 1 1 auto;
  overflow-y: auto;
  height: 0px;
}

footer {
  padding: 0.5rem 1rem 0.5rem;
}

#footer-logo {
  /* filter: saturate(0%) contrast(0%) brightness(200%); */
  /* opacity: 0.5; */
}
</style>
