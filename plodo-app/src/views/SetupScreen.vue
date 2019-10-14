<template>
<div style="padding: 10px;">
<img src="@/assets/artwork/logo.png" width="200px" />

Configure voting options:
  <voting-configurator />
  <base-switch></base-switch> Celebrate on screen
  <base-button style="primary">Start</base-button>
  </div>
</template>

<script>
import VotingConfigurator from "@/components/VotingConfigurator";
export default {
    components: {
        VotingConfigurator
    }
}
</script>

<style>

</style>