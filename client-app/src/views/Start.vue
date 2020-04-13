<template>
  <div>
    <!-- <section class="hero is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Join a plodo session</h1>
        </div>
      </div>
    </section> -->
    <section class="section" style="margin-bottom: -10em;">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5"><img style="margin-top: -6em;" :src="require(`@/assets/artwork/communication.svg`)" /></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-8 has-text-centered">
            <div>
              <p class="title">Wanna play?</p>
              <p>Enter the session code, you got from the presenter here:</p>
            </div>
            <SessionConnect :id="id" />
            <hr style="margin-top: 3em;" />
            <p class="has-text-grey-lighter">
              Curious on how to use plodo? Learn more
              <a href="https://plodo.io">here</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SessionConnect from "@/components/SessionConnect.vue";

export default {
  name: "Start",
  props: ["id"],
  components: {
    SessionConnect
  }
};
</script>
