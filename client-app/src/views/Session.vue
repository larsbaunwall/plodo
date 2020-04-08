<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5 has-text-centered">
          <p class="title">Got feedback?</p>
          <p>Submit your feedback via the options below:</p>
          <FeedbackSession :sessionId="id" style="margin-top: 3em" />
        </div>
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
  props: {
    id: String
  },
  computed: {
    ...mapGetters(["activeSession"])
  }
};
</script>

<style>
</style>