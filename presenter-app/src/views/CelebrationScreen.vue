<template>
  <div />
</template>

<script>
import Two from "two.js";
import {parse} from "twemoji-parser";

export default {
  data() {
    return {
      emojis: [],
      gravity: new Two.Vector(0, -0.1),
      two: new Two({
        type: Two.Types["canvas"],
        fullscreen: true,
        autostart: true
      }),
    };
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "recordVote") {

        let emoji = parse(mutation.payload.id, {assetType: "png"});
        if(emoji.length)
          this.addEmoji(emoji[0].url);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  mounted() {
    // document.documentElement.style.background = "none";
    // document.body.style.background = "none";

    this.two.appendTo(document.body);

    let self = this;
    this.two
      .bind("update", function() {
        if(self.emojis) {
          for (var i = 0; i < self.emojis.length; i++) {

            var emoji = self.emojis[i];
            emoji.translation.addSelf(emoji.velocity);

            emoji.velocity.addSelf(self.gravity);

            emoji.scale = emoji.scale * 0.99;
          }
        }
      });
  },
  methods: {
    addEmoji(emojiPng) {

      //remove when outside viewport
      for(var i = 0; i < this.emojis.length; i++) {
        let emoji = this.emojis[i];
        if (emoji.scale < 0.1 || emoji.translation.y < 0)  {
          this.two.scene.remove(emoji);
          //emojis = emojis.filter( el => el !== emoji );
          this.emojis.splice(i, 1);
        }
      }

      let m = this.two.width * 0.1; //margin
      let w = this.two.width - (8 * m);

      let x = (Math.random() * w) + (7*m);
      let y = this.two.height * 1.0;

      let shape = this.two.makeSprite(emojiPng, 72, 72);
      shape.velocity = new Two.Vector();
      shape.velocity.x = 4 * (Math.random() - 0.7);
      shape.velocity.y = -(Math.random() * 1);

      shape.scale = 1;

      shape.translation.x = x;
      shape.translation.y = y;

      this.two.add(shape);
      this.emojis.push(shape);
    },

  },
};
</script>

<style>

</style>
