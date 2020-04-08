<template>
  <div>
    <div style="margin-top: 1em;">
      <input
        class="input is-large is-primary is-size-1 is-uppercase has-text-centered has-text-weight-bold"
        maxlength="4"
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
      <button class="button is-medium is-success is-rounded" @click="joinSession">
        <span class="icon">
          <i class="fas fa-play"></i>
        </span>
        <span>Join</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SessionConnect",
  props: {id: String},
  data() {
    return {
      sessionId: this.id
    }
  },
  methods: {
    joinSession() {
      const sId = this.sessionId.toUpperCase();
      this.$store
        .dispatch("joinSession", { sessionId: sId })
        .then(() => {
          this.$router.push({ name: "Session", params: {id: sId } });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  width: 200px;
  font-family: monospace;

}
</style>
