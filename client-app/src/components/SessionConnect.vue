<template>
  <div>
    <div style="margin-top: 1em;">
      <input
        class="input is-large is-primary is-uppercase has-text-centered"
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
  props: ["sessionId"],
  methods: {
    joinSession() {
      this.$store
        .dispatch("joinSession", { sessionId: this.sessionId })
        .then(() => {
          this.$router.push({ name: "Session" });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
  width: 100px;
}
</style>
