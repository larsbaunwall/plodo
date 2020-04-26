<template>
  <div>
    <div class="card is-primary">
      <header class="card-header">
        <div class="level is-mobile card-header-title">
          <div class="level-left">
            <div class="level-item">
              Session
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button
                class="button is-outline is-family-monospace has-text-secondary"
                title="Copy to clipboard"
                @click="copySessionId()"
              >
                <span>{{ activeSession.id }}</span><b-icon
                  icon="copy"
                  size="is-small"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      <div class="card-content">
        <p>Celebration</p>
        <span title="Toggle celebration on screen">
          <b-switch
            v-model="shouldCelebrate"
            @input="toggleCelebration"
          />
        </span>
        <div class="buttons is-centered">
          <button
            class="button is-primary"
            @click="quitSession"
          >
            Quit session
          </button>
        </div>
      </div>
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
import { clipboard, ipcRenderer } from "electron";
export default {
  components: { SmileyCounter },
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
      this.$store.dispatch("toggleCelebration", {shouldCelebrate: val});
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
