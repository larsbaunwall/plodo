<template>
	<div style="padding: 10px;">
		<div class="row">
			<div class="col-12">
				<div class="form-group">
					<voting-configurator
						:maxNumberOfOptions="3"
						v-on:optionsChanged="handleOptionsChanged"
					/>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-2">
				<div class="form-group">
					<base-switch />
				</div>
			</div>
			<div class="col-10">
				<div class="form-group">Celebrate on screen
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<div class="form-group">
					<base-button
            @click="startSession"
						block
						style="primary"
					>Start</base-button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<img
					src="@/assets/artwork/logo.png"
					width="100px"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import VotingConfigurator from "@/components/VotingConfigurator";
export default {
	components: {
		VotingConfigurator
  },
  data () {
return {
    votingOptions: [],
  };
},
	methods: {
		handleOptionsChanged (args) {
      this.votingOptions = args.selected;
    },
    async startSession () {
      try {
        await this.$store.dispatchPromise("createSession", { votingOptions: this.votingOptions });
        this.$router.push("/session");
      } catch (error) {
        console.log({ error });
      }
    }
	}
};
</script>

<style>
</style>
