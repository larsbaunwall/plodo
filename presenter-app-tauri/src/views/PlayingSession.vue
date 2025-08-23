<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-small has-text-secondary">
            <i class="fas fa-asterisk"></i>
          </span>
        </div>
        <div class="level-item has-text-secondary has-text-weight-bold">Session ID</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons has-addons">
            <button
              class="button is-family-monospace has-text-secondary has-text-weight-bold"
              title="Copy to clipboard"
              @click="copySessionId()"
            >{{ sessionStore.sessionConfig?.id || 'N/A' }}</button>
            <button
              class="button has-text-secondary"
              title="Copy to clipboard"
              @click="copySessionId()"
            >
              <span class="icon is-small">
                <i class="fas fa-copy"></i>
              </span>
            </button>
            <button
              class="button has-text-grey"
              title="Open in browser"
              @click="openSessionInBrowser()"
            >
              <span class="icon is-small">
                <i class="fas fa-external-link-alt"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-small">
            <i class="fas fa-tv"></i>
          </span>
        </div>
        <div class="level-item">Screen</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <screen-selection-dropdown />
        </div>
      </div>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-small">
            <i class="far fa-heart"></i>
          </span>
        </div>
        <div class="level-item">Show celebration</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <label class="switch">
            <input type="checkbox" v-model="shouldCelebrate">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="buttons is-centered">
      <button class="button is-secondary is-rounded" @click="quitSession">
        <span class="icon is-small">
          <i class="fas fa-sign-out-alt"></i>
        </span>
        <span>End session</span>
      </button>
    </div>
    <smiley-counter
      v-for="opt in sessionStore.sessionConfig?.votingOptions || []"
      :key="opt.id"
      :smiley="opt.emoji"
      :count="getVoteCount(opt.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/session'
import SmileyCounter from '../components/SmileyCounter.vue'
import ScreenSelectionDropdown from '../components/ScreenSelectionDropdown.vue'

const router = useRouter()
const sessionStore = useSessionStore()
const selectedScreenId = ref('')

const shouldCelebrate = computed({
  get() {
    return false // We'll implement celebration later
  },
  set(_val: boolean) {
    // Toggle celebration
  }
})

const getVoteCount = (optionId: string) => {
  const result = sessionStore.votingResults.find((r: any) => r.optionId === optionId)
  return result ? result.count : 0
}

const copySessionInfo = async () => {
  // For now, just log. In production, copy session details to clipboard
  console.log('Would copy session info to clipboard')
}

const handleScreenChange = (screenId: string) => {
  selectedScreenId.value = screenId
  // Handle screen change
}

const quitSession = async () => {
  await sessionStore.endSession()
  router.push({ name: 'Setup' })
}

const copySessionId = async () => {
  // For now, just log. In production, copy session ID to clipboard
  console.log('Would copy session ID to clipboard:', sessionStore.sessionConfig?.id)
}

const openSessionInBrowser = async () => {
  // For now, just log. In production, open URL in browser
  const sessionId = sessionStore.sessionConfig?.id
  console.log('Would open in browser:', `https://www.plodo.io/#/start/${sessionId}`)
}
</script>

<style scoped>
/* Switch styles */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>