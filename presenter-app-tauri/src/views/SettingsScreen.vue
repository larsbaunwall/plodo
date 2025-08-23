<template>
  <div>
    <h1 class="title is-5">Celebration settings</h1>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-small">
            <i class="fas fa-tv"></i>
          </span>
        </div>
        <div class="level-item">Celebration screen</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <screen-selection-dropdown />
        </div>
      </div>
    </div>
    <hr />
    <div class="content">
      <h1 class="title is-5">Support</h1>
      <p>
        Got an idea for a new feature or want to submit a bug? That is just awesome
        <twemoji cssClass="twa twa-1x" emojis="💪" /> please let us know!
      </p>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">Open an issue on GitHub</div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-secondary is-outlined" @click="openIssue">
              <span>Open issue</span>
              <span class="icon is-small">
                <i class="fas fa-external-link-alt"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <h1 class="title is-5">About</h1>
      <p>plodo started out as an idea to get audiences more involved during online and offline presentations.</p>
      <p>We hope you enjoy it as much as we do building it!</p>
      <h2 class="title is-6">Get involved</h2>
      <p>
        This project is
        <a
          href="https://github.com/larsbaunwall/plodo"
          target="_blank"
          @click.prevent="openExternalBrowser"
        >open source</a>. If you like it, help us by
        <twemoji cssClass="twa twa-1x" emojis="⭐" /> our repo on GitHub or recommend plodo to a friend <twemoji cssClass="twa twa-1x" emojis="❤" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue'
import Twemoji from '../components/Twemoji.vue'

const openExternalBrowser = async (event: Event) => {
  const target = event.target as HTMLAnchorElement
  if (target.href) {
    // For now, just log the URL. In production, you'd use Tauri's shell API
    console.log('Would open:', target.href)
    // await open(target.href)
  }
}

const openIssue = async () => {
  // For now, just log the URL. In production, you'd use Tauri's shell API
  console.log('Would open:', 'https://github.com/larsbaunwall/plodo/issues/new')
  // await open('https://github.com/larsbaunwall/plodo/issues/new')
}
</script>

<style scoped>
</style>
