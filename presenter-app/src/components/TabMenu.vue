<template>
  <section class="nav-section section">
    <div class="container">
      <div class="tabs is-centered">
        <ul>
          <router-link
            tag="li"
            active-class="is-active"
            :to="{name: 'Start'}"
          >
            <a>
              <b-icon
                icon="bullhorn"
                size="is-small"
                aria-hidden="true"
              />
              <span>Session</span>
              <span
                v-if="$store.getters.activeSession.id !== ''"
                class="tag is-family-monospace session-tag"
              >{{ $store.getters.activeSession.id }}</span>
            </a>
          </router-link>
          <!-- <router-link
            tag="li"
            active-class="is-active"
            :to="{name: 'Settings'}"
            exact
          >
            <a>
              <b-icon
                icon="cog"
                size="is-small"
                aria-hidden="true"
              />
              <span>Settings</span>
            </a>
          </router-link> -->
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.nav-section {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.session-tag {
  margin-left: 0.5em;
  font-size: 0.7rem;
}
</style>
