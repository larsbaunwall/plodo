<template>
	<div>
		<section
			id="home"
			class="section"
		>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8"><img :src="require(`@/assets/artwork/communication.svg`)" />
						<div class="content is-hidden-mobile has-text-centered">
							<h1 class="title has-text-primary is-1">Get Live Audience Feedback
								<twemoji
									emojis="👀"
									sizeClass="twa-1em"
								/>
							</h1>
							<p>Get immediate feedback from your audience while you present.</p>
							<p>Download the Presenter's app here. It's 100% free (and <a href="https://www.github.com/larsbaunwall/plodo">open source</a>, actually).</p>
							<download-buttons />
						</div>
						<div class="content is-hidden-tablet has-text-centered">
							<h1 class="title has-text-primary is-1">Submit live feedback
								<twemoji
									emojis="👍"
									sizeClass="twa-1em"
								/>
							</h1>
							<p>Now you can collect live feedback while you present your big idea.</p>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section
			id="features"
			class="section has-background-lightblue is-hidden-mobile"
		>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8 has-text-centered">
						<div class="content">
							<h2 class="title has-text-primary is-3">Put the
								<twemoji emojis="🎉" /> back in your presentations</h2>
							<p> </p>
							<div class="tile is-8 is-ancestor">
								<feature-tile
									title="Instant feedback"
									bodyText="Let your audience express themselves as you present your big idea."
									icon="⏱"
								/>
								<feature-tile
									title="Connect with your audience"
									bodyText="Connect with your audience on the spot. Wether it's in-person or virtual."
									icon="🙌"
								/>
								<feature-tile
									title="Make it fun"
									bodyText="Plodo makes participation fun with our mobile feedback tool."
									icon="🥳"
								/>
								<feature-tile
									title="We're Open Source"
									bodyText="Oh, we are 100% open source, go look see @ our <a href='https://www.github.com/larsbaunwall/plodo'>repo</a>."
									icon="❤️"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section
			style="padding-top: 5em"
			class="section is-hidden-mobile"
		>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8">
						<div class="content has-text-centered">
							<h2 class="title has-text-primary is-3">Meet plodo
								<twemoji emojis="❤️" />
							</h2>
							<p>When you start a feedback session you are inviting your audience to cheer with you. Right there.</p>
							<p class="is-spacer"></p>
						</div>
						<div class="content">
							<div class="columns">
								<div class="column is-flex">
									<div
										class="is-centered"
										style="position: relative; display:block; width:300px; height:370px;"
									>
										<img
											class="screenshot"
											style=""
											src="../assets/artwork/screenshot-setup.png"
											width="200px"
										/><img
											class="screenshot"
											style="position:absolute; left: 100px; top: 70px; z-index: 2"
											src="../assets/artwork/screenshot-session.png"
											width="200px"
										/>
									</div>
								</div>
								<div class="column is-flex has-vcentered">
									<div class="content">
										<h3 class="title has-text-secondary is-5">Set up your session</h3>
										<p>Easily select what feedback your audience can submit.</p>
										<p>Fire up the plodo presenter's app. When you're ready, your audience can submit feedback in our responsive web app.</p>
										<p>When you're ready, share the session code.</p>
									</div>
								</div>
							</div>
							<div class="columns">
								<div class="column is-flex has-vcentered">
									<div class="content">
										<h3 class="title has-text-secondary is-5">Submit feedback</h3>
										<p>Submit your immediate feedback alongside the presentation.</p>
										<p>Whenever you submit a reaction, it's instantly shared with your presenter.</p>
									</div>
								</div>
								<div class="column has-text-right"><img
										class="screenshot"
										src="../assets/artwork/screenshot-feedback.png"
										width="200px"
									/></div>
							</div>
							<div class="content has-text-centered">
								<h3 class="title has-text-secondary is-4">Celebrate!</h3>
								<p>Let the celebration begin! Follow the feedback as it's submitted, also on the big screen!</p>
								<img
									class="screenshot"
									style="width:100%"
									src="../assets/artwork/demo-recording.gif"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section
			id="join"
			class="section has-background-secondary"
		>
			<div class="container">
				<div class="columns is-mobile is-centered">
					<div class="column has-text-centered has-text-white">
						<div>
							<h2 class="title is-2 has-text-highlight">Wanna play a game
								<twemoji emojis="👏" />?</h2>
							<p>Enter your session code below:</p>
						</div>
						<SessionConnect :id="id" />
					</div>
				</div>
			</div>
		</section>
		<section
			id="faq"
			class="section has-background-highlight"
		>
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8">
						<h2 class="title has-text-primary is-3 has-text-centered">Frequently asked
							<twemoji emojis="🧐" />
						</h2>
						<faq />
					</div>
				</div>
			</div>
		</section>

	</div>
</template>

<script>
import SessionConnect from "@/components/SessionConnect.vue";
import FeatureTile from "@/components/FeatureTile.vue";
import Faq from "@/components/Faq.vue";
import Twemoji from "@/components/Twemoji.vue";
import DownloadButtons from "@/components/DownloadButtons.vue";

export default {
	name: "Start",
	props: ["id"],
	components: {
		SessionConnect,
		FeatureTile,
		Faq,
		Twemoji,
		DownloadButtons,
	}
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/plodo.scss";

.screenshot {
	-webkit-box-shadow: 10px 10px 50px -30px $primary;
	-moz-box-shadow: 10px 10px 50px -30px $primary;
	box-shadow: 10px 10px 50px -30px $primary;
	border-radius: 5px;
}

p.is-spacer {
	margin: 5em;
}

.has-vcentered {
	align-items: center;
}

section {
	padding-top: 5rem !important;
	padding-bottom: 5rem !important;
}
</style>