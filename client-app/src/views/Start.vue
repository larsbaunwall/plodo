<template>
	<div>
		<!-- <section class="hero is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Join a plodo session</h1>
        </div>
      </div>
    </section> -->
		<section class="section">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8"><img :src="require(`@/assets/artwork/communication.svg`)" />
						<div class="content has-text-centered">
							<h1 class="title">Live Audience Feedback <twemoji emojis="👀" /></h1>
							<p>Get immediate feedback from your audience while you present.</p>
							<p>Download the Presenter's app here. It's 100% free (and <a href="https://www.github.com/larsbaunwall/plodo">open source</a>, actually).</p>
							<div class="buttons is-centered">
								<button class="button is-primary is-medium is-outlined">
									<span class="icon"><i class="fab fa-windows" /></span><span>Windows</span></button>
								<button class="button is-primary is-medium is-outlined">
									<span class="icon"><i class="fab fa-apple" /></span><span>MacOS</span></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section has-background-lightblue">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8 has-text-centered">
						<div class="content">
							<h2 class="title is-3">Put the <twemoji emojis="🎉" /> back in your presentations</h2>
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
									title="Make it Fun"
									bodyText="Plodo makes participation fun with our mobile feedback tool."
									icon="🥳"
								/>
								<feature-tile
									title="We're Open Source"
									bodyText="Oh, we 100% open source, go look see @ our <a href='https://www.github.com/larsbaunwall/plodo'>GitHub repo</a>."
									icon="❤️"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="columns is-centered">
					<div class="column is-8 has-text-centered">
						<div class="content">
							<h2 class="title is-3">Meet plodo <twemoji emojis="❤️" /></h2>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section has-background-lightblue">
			<div class="container">
				<div class="columns is-mobile is-centered">
					<div class="column has-text-centered">
						<div>
							<p class="title">Wanna play a game <twemoji emojis="👏" />?</p>
							<p>Enter the session code, you've got from the presenter here</p>
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
import FeatureTile from "@/components/FeatureTile.vue";
import Twemoji from "@/components/Twemoji.vue";

export default {
	name: "Start",
	props: ["id"],
	components: {
		SessionConnect,
    FeatureTile,
    Twemoji
	}
};
</script>