<template>
  <div class="has-addons">
    <div class="select">
      <b-select v-model="selectedScreen" :size="size" placeholder="Select screen">
        <option
          :value="primaryScreen.id"
        >Primary ({{ primaryScreen.size.width }}x{{ primaryScreen.size.height }})</option>
        <option
          v-for="(screen, idx) in externalScreens"
          :key="screen.id"
          :value="screen.id"
        >External {{ idx+1 }}: ({{ screen.size.width }}x{{ screen.size.height }})</option>
      </b-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { remote } from "electron";

export default {
  props: {
    size: String,
  },
  computed: {
    ...mapGetters(["allScreens", "celebrationScreen"]),
    selectedScreen: {
      set(id) {
        console.log(id);
        const screen = this.allScreens.find(x => x.id === id);
        this.$store.dispatch("changeCelebrationScreen", screen);
      },
      get() {
        return this.celebrationScreen.id;
      },
    },
    externalScreens() {
      return this.allScreens.filter(x => !x.isPrimary);
    },
    primaryScreen() {
      return this.allScreens.find(x => x.isPrimary);
    },
  },
};

</script>

<style>
</style>