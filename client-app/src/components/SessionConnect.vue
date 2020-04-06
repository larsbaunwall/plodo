<template>
  <div>
    <div><input v-model="sessionId" type="text" /></div>
    <div><a @click="joinSession">Join</a></div>
  </div>
</template>

<script>
export default {
  name: 'SessionConnect',
  data() {
    return {
      sessionId: ""
    }
  },
  methods: {
    joinSession(){
      this.$store
        .dispatch("joinSession", {sessionId: this.sessionId})
        .then(() => {
          this.$router.push({name: "Session"})
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
