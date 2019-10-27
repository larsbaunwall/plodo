<template>
	<div>
    <div>
      {{count}}
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
  data () {
    return {
    }
  },
  props: {
      smiley: String,
      count: Number
  }
};
</script>

<style>
</style>
