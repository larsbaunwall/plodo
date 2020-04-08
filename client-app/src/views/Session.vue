<template>
  <section class="section" style="margin-bottom: -10em;">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5">Session {{id}}</div>
        <FeedbackSession />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import FeedbackSession from "@/components/FeedbackSession.vue";

export default {
  name: "Session",
  components: {
    FeedbackSession
  },
  props: ["id"],
  computed: {
    ...mapGetters(["activeSession"])
  }
};
</script>

<style>
</style>