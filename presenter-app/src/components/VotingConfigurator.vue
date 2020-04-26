<template>
  <div class="buttons is-centered">
    <template v-for="(n, idx) in maxOptions">
      <button
        v-if="selectedOptions[idx] !== undefined"
        :key="idx"
        class="button is-outline is-large"
        @click="unselectOption(idx)"
      >
        <twemoji :emojis="selectedOptions[idx].id" />
      </button>
      <b-dropdown
        v-else
        :key="idx"
        aria-role="list"
      >
        <button
          slot="trigger"
          class="button is-outline is-large"
        >
          <b-icon
            icon="question"
            class="has-text-lightblue-darker"
          />
        </button>
        <b-dropdown-item
          v-for="opt in options.filter(x => selectedOptions.indexOf(x) === -1)"
          :key="opt.id"
          aria-role="listitem"
          @click="chooseOption(idx, opt)"
        >
          <twemoji :emojis="opt.id" />
        </b-dropdown-item>
      </b-dropdown>
    </template>
    <button
      v-if="addingAllowed"
      class="button is-large is-outline"
      title="Add one more"
      outline
      type="secondary"
      icon="fa fa-plus"
      @click="addOption"
    />
    <button
      v-if="selectedOptions.length > 0"
      class="button is-large is-outline"
      title="Start over"
      type="secondary"
      @click="reset"
    >
      <b-icon
        icon="undo"
        class="has-text-secondary"
      />
    </button>
  </div>
</template>

<script>
import Twemoji from "./Twemoji";
export default {
  name: "VotingConfigurator",
  components: {
    Twemoji,
  },
  props: {
    maxNumberOfOptions: Number,
    addingAllowed: Boolean,
  },
  data() {
    return {
      options: [
        { id: "😀", name: "Smile" },
        { id: "😡", name: "Pouting" },
        { id: "❤️", name: "Love" },
        { id: "👍", name: "Like" },
        { id: "👎", name: "Dislike" },
        { id: "☕️", name: "Coffee" },
        { id: "💩", name: "Poo" },
        { id: "🦅", name: "Eagle" },
      ],
      selectedOptions: [],
      maxOptions: this.maxNumberOfOptions,
    };
  },
  computed: {},
  methods: {
    chooseOption(idx, option) {
      this.$set(this.selectedOptions, idx, option);
      this.$emit("optionsChanged", {
        selected: this.selectedOptions.filter(Boolean),
      });
    },
    unselectOption(idx) {
      this.$set(this.selectedOptions, idx, undefined); // TODO: use an object as dictionary instead (instead of array, as change detection in Vue is not great with arrays)
      this.$emit("optionsChanged", {
        selected: this.selectedOptions.filter(Boolean),
      });
    },
    addOption() {
      this.maxOptions += 1;
    },
    reset() {
      this.selectedOptions = [];
      this.maxOptions = this.maxNumberOfOptions;
      this.$emit("optionsChanged", {
        selected: this.selectedOptions.filter(Boolean),
      });
    },
  },
};
</script>

<style>
</style>
