<template>
  <div class="col">
    <div class="card w-100 mt-3">
      <div class="card-body">
        <div class="card-title">
          <h5>Session</h5>
        </div>
        <div class="row">
          <div class="col-6">
            <p>In session</p>
          </div>
          <div class="col-6">
            <p>
              <span
                id="sessionId"
                style="font-family:monospace;font-size:1.2em; font-weight:bold"
                title="Copy to clipboard"
                @click="copySessionId()"
              >
                {{ activeSession.id }}
                <i class="sessionId-btn fa fa-copy" />
              </span>
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>Celebration</p>
          </div>
          <div class="col-6">
            <span title="Toggle celebration on screen">
              <!-- <base-switch :value="celebrate" @change="toggleCelebration()" /> -->
            </span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button
              block
              outline
              style="primary"
              icon="fa fa-sign-out"
              @click="quitSession"
            >
              Quit session
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="opt in activeSession.options"
      :key="opt.id"
      class="row"
    >
      <div class="col">
        <smiley-counter
          :smiley="opt.id"
          :count="opt.count"
        />
      </div>
    </div>
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
      this.$router.push("/");
    },
    copySessionId() {
      clipboard.writeText(this.activeSession.id);
    },
    toggleCelebration(val) {
      this.$store.dispatch("toggleCelebration");
    },
  },
};
</script>

<style scoped>
/* #sessionId {
  padding: 5px;
  margin-left: -5px;
  cursor: pointer;
}

#sessionId:hover {c
  border: solid 1px $primary;
  border-radius: 0.2em;
  padding: 5px;
  margin-left: -6px;
}

#sessionId:hover .sessionId-btn {
  color: $primary;
}

.sessionId-btn {
  color: $light;
  margin-left: 0.5em;
} */
</style>
