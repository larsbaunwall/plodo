<template>
      <div class="tile is-vertical is-parent">
      <div class="tile is-mobile is-flex justify-content-center"><div class="feature-icon has-background-light"><twemoji :emojis="icon" sizeClass="twa-3x"/></div></div>
      <div class="tile justify-content-center content">
        <div class="content has-text-centered"><h4 class="subtitle is-4">{{title}}</h4>
      <p v-html="bodyText"></p></div></div>
    </div>
</template>

<script>
import Twemoji from "./Twemoji";
export default {
    name:"FeatureTile",
    props: ["icon", "title", "bodyText"],
    components: {
        Twemoji
    }
}
</script>

<style lang="scss" scoped>

@import "../assets/scss/plodo.scss";

.feature-icon {
  display:flex;
  align-items: center;
  justify-content: center;
  color: $primary;
  border-radius: 100%;
  height: 8em;
  width: 8em;
  margin: 2em;
}

</style>