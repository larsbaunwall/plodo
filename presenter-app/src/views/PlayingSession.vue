<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon class="has-text-secondary" icon="asterisk" size="is-small" />
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
            >{{ activeSession.id }}</button>
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
          <screen-selection-dropdown />
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

<script>
import { mapGetters } from "vuex";
import SmileyCounter from "@/components/SmileyCounter.vue";
import ScreenSelectionDropdown from "../components/ScreenSelectionDropdown";
import { clipboard, ipcRenderer, remote } from "electron";
export default {
  components: { SmileyCounter, ScreenSelectionDropdown },
  computed: {
    ...mapGetters(["activeSession", "celebrate"]),
    shouldCelebrate: {
      get() {
        return this.celebrate;
      },
      set(val) {
        this.$store.dispatch("toggleCelebration", val);
      },
    },
  },
  methods: {
    async quitSession() {
      await this.$store.dispatch("removeActiveSession");
      this.$router.push({ name: "Setup" });
    },
    copySessionId() {
      clipboard.writeText(this.activeSession.id);
    },
    toggleCelebration(val) {
      this.$store.dispatch("toggleCelebration", val);
    },
    openSessionInBrowser() {
      remote.shell.openExternal(
        `https://www.plodo.io/#/start/${this.activeSession.id}`
      );
    },
  },
};
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
