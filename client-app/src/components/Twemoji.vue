<template>
  <span>
    <i
      v-for="(img, i) in emojiImgs"
      :key="i"
      :class="`twa ${sizeClass}`"
      :style="img"
    />
  </span>
</template>

<script>
import {parse} from "twemoji-parser";

export default {
  name: "Twemoji",
  props: {
    emojis: {
      type: String,
      default: ""
    },
    sizeClass: {
      type: String,
      default: "twa-30px"
    }
  },
  computed: {
    emojiImgs() {
      let emojis = parse(this.emojis);
      let m = emojis.map( e => { return { backgroundImage: `url('${e.url}')` }; });
      return m;
    }
  },
};
</script>

<style>

</style>
