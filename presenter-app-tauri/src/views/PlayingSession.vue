<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon class="has-text-secondary" icon="asterisk" size="is-small" />
        </div>
        <div class="level-item has-text-secondary has-text-weight-bold">
          Session ID
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons has-addons">
            <button
              class="button is-family-monospace has-text-secondary has-text-weight-bold"
              title="Copy to clipboard"
              @click="copySessionId()"
            >
              {{ activeSession.id }}
            </button>
            <button
              class="button has-text-secondary"
              title="Copy to clipboard"
              @click="copySessionId()"
            >
              <b-icon icon="copy" size="is-small" />
            </button>
            <button
              class="button has-text-grey"
              title="Open in browser"
              @click="openSessionInBrowser()"
            >
              <b-icon icon="external-link-alt" size="is-small" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon class icon="tv" size="is-small" />
        </div>
        <div class="level-item">Screen</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <screen-selection-dropdown @screen-changed="handleScreenChanged" />
        </div>
      </div>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon icon="heart" pack="far" size="is-small" />
        </div>
        <div class="level-item">Show celebration</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-switch
            v-model="shouldCelebrate"
            size="is-small"
            title="Toggle celebration on screen"
          />
        </div>
      </div>
    </div>
    <div class="buttons is-centered">
      <button class="button is-secondary is-rounded" @click="quitSession">
        <b-icon icon="sign-out-alt" size="is-small" />
        <span>End session</span>
      </button>
    </div>
    <smiley-counter
      v-for="opt in activeSession.options"
      :key="opt.id"
      :smiley="opt.id"
      :count="opt.count"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'
import SmileyCounter from '../components/SmileyCounter.vue'
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue'
import { openUrl } from '@tauri-apps/plugin-opener'
import { invoke } from '@tauri-apps/api/core'

const router = useRouter()
const sessionStore = useSessionStore()

const activeSession = computed(() => {
  if (!sessionStore.sessionConfig) return { id: '', options: [] }

  return {
    id: sessionStore.sessionConfig.id || '',
    options: sessionStore.sessionConfig.votingOptions.map(opt => ({
      id: opt.id,
      emoji: opt.emoji,
      label: opt.label,
      count: getVoteCount(opt.id),
    })),
  }
})

const celebrate = computed(() => sessionStore.celebrate)

const shouldCelebrate = computed({
  get() {
    return celebrate.value
  },
  set(val: boolean) {
    sessionStore.toggleCelebration(val)
    if (val) {
      const screenId = sessionStore.celebrationScreen || ''
      invoke('show_celebration_window', { screen_id: screenId }).catch(() => {})
    } else {
      invoke('hide_celebration_window').catch(() => {})
    }
  },
})

const getVoteCount = (optionId: string) => {
  const result = sessionStore.votingResults.find(
    (r: any) => r.optionId === optionId
  )
  return result ? result.count : 0
}

const handleScreenChanged = (id: string) => {
  sessionStore.setCelebrationScreen(id)
}
const quitSession = async () => {
  await sessionStore.endSession()
  router.push({ name: 'Setup' })
}

const copySessionId = async () => {
  const id = activeSession.value.id
  try {
    await navigator.clipboard.writeText(id)
  } catch {
  }
}

const openSessionInBrowser = async () => {
  await openUrl(`https://www.plodo.io/#/start/${activeSession.value.id}`)
}
</script>

<style scoped>
#sessionId {
  padding: 5px;
  margin-left: -5px;
  cursor: pointer;
}

/* #sessionId:hover {c
  border: solid 1px $primary;
  border-radius: 0.2em;
  padding: 5px;
  margin-left: -6px;
} */

/* #sessionId:hover .sessionId-btn {
  color: $primary;
}

.sessionId-btn {
  color: $light;
  margin-left: 0.5em;
} */
</style>
