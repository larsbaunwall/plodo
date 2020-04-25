<template>
  <div>
    <div style="margin-top: 1em;">
      <cleave
        class="input is-large has-background-lightblue is-primary is-size-2 has-text-primary is-uppercase has-text-centered has-text-weight-bold"
        :options="options"
        :raw="false"
        maxlength="7"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="off"
        placeholder="Code"
        v-model="sessionId"
        type="text"
      />
    </div>
    <div style="margin-top: 3em;">
      <button class="button is-large is-success is-rounded" @click="joinSession">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>Join</span>
      </button>
    </div>
  </div>
</template>

<script>
import Cleave from "vue-cleave-component";
export default {
  name: "SessionConnect",
  components: {
    Cleave,
  },
  props: {id: String},
  data() {
    return {
      sessionId: this.id,
      options: {
        blocks: [3, 3],
        uppercase: true,
        delimiter: '-',
      }
    }
  },
  methods: {
    async joinSession() {
      const sId = this.sessionId.toUpperCase();

      await this.$store.dispatch("joinSession", { sessionId: sId })        
      this.$router.push({ name: "Session", params: {id: sId } });
    }
  }
};
</script>

<style scoped lang="scss">
input {
  width: 300px;
  font-family: monospace;
}
</style>
