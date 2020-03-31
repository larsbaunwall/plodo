<template>
  <div>
    <div>
      {{ count }}
    </div>
    <div>
      <img
        :src="require(`@/assets/artwork/emojis/svg/${smiley}.svg`)"
        width="30px"
        height="30px"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "SmileyCounter",
  props: {
    smiley: String,
    count: Number
  },
  data () {
    return {
    };
  }
};
</script>

<style>
</style>
