<template>
  <div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon
            icon="asterisk"
            size="is-small"
          />
        </div>
        <div class="level-item">
          Session ID
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button
            class="button is-outline is-family-monospace has-text-secondary"
            title="Copy to clipboard"
            @click="copySessionId()"
          >
            <span>{{ activeSession.id }}</span>
            <b-icon
              icon="copy"
              size="is-small"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon
            icon="tv"
            size="is-small"
          />
        </div>
        <div class="level-item">
          Celebration
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <b-switch
            v-model="celebrate"
            title="Toggle celebration on screen"
            @input="toggleCelebration"
          />
        </div>
      </div>
    </div>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon
            icon="info-circle"
            size="is-small"
          />
        </div>
        <div class="level-item">
          Status
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <session-health />
        </div>
      </div>
    </div>
    <div class="buttons is-centered">
      <button
        class="button is-primary"
        @click="quitSession"
      >
        <b-icon
          icon="sign-out-alt"
          size="is-small"
        />
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
import SessionHealth from "@/components/SessionHealth.vue";
import { clipboard, ipcRenderer } from "electron";
export default {
  components: { SmileyCounter, SessionHealth },
  data() {
    return {
      shouldCelebrate: this.celebrate,
    };
  },
  computed: {
    ...mapGetters(["activeSession", "celebrate"]),
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
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 0.8rem;
}
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
