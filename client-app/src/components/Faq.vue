<template>
	<div class="faq has-background-light">
		<b-collapse
			class="card is-shadowless has-background-light"
			animation="slide"
			v-for="(collapse, index) of collapses"
			:key="index"
			:open="isOpen == index"
			@open="isOpen = index"
		>
			<div
				slot="trigger"
				class="card-header is-shadowless"
				role="button"
			>
				<p class="card-header-title">
					{{ collapse.title }}
				</p>
				<a class="card-header-icon">
					<!-- <b-icon :icon="props.open ? 'angle-down' : 'angle-up'">
					</b-icon> -->
				</a>
			</div>
			<div class="card-content">
				<div class="content" v-html="collapse.text">
				</div>
			</div>
		</b-collapse>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: 0,
			collapses: [
				{
					title: "How do I start?",
					text: "Getting started is easy! Download the latest presenter's app <a href='https://github.com/larsbaunwall/plodo/releases/latest'>here</a>, create a session and share the ID with your audience. "
				},
				{
					title: "How do I participate in a session?",
					text: "You need a session ID. When you have that, you join the session right <a href='#join'>here</a>. You can join both from phone, tablet, and PC."
				},
				{
					title: "Is plodo free?",
					text: "Yes, and <a href='https://github.com/larsbaunwall/plodo'>open source</a> too. Contributions are very welcome!"
				},
				{
					title: "I am missing a feature. How do I report that?",
					text: "Ideas for new features? That's just awesome! Submit your idea on <a href='https://github.com/larsbaunwall/plodo/issues'>GitHub</a>, or send us a PR!"
				},
				{
					title: "Who made this?",
					text: "plodo is built by <a href='https://github.com/larsbaunwall'>Lars Baunwall</a> in beautiful Denmark"
				}
			]
		};
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/plodo.scss";
    .faq {
    -webkit-box-shadow: 10px 10px 50px -30px $primary;
	-moz-box-shadow: 10px 10px 50px -30px $primary;
    box-shadow: 10px 10px 50px -30px $primary;
    padding: 5px;
	border-radius: 5px;
    }

    .card-content {
        border-top: 1px solid $secondary;
	}
	.card-header {
		cursor: pointer;
		border-radius: 5px;
	}
	.card-header:hover {
		color: $secondary;
		background-color: $white-bis;
	}
</style>
