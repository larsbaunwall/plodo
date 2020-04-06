<template>
  <div class="form-group">
    <span
      v-for="(n, idx) in maxOptions"
      :key="idx"
    >
      <base-button
        v-if="selectedOptions[idx] !== undefined"
        type="primary"
        outline
        style="margin-right: 8px; height: 50px"
        @click="unselectOption(idx)"
      ><i :class="`twa twa-30px ${selectedOptions[idx].id}`" />
      </base-button>
      <base-dropdown
        v-else
        hide-arrow
        menu-classes="emoji-dropdown"
      >
        <base-button
          slot="title"
          style="height: 50px"
          type="secondary"
          icon="fa fa-2x fa-question"
        />
        <li
          v-for="opt in options.filter(x => selectedOptions.indexOf(x) === -1)"
          :key="opt.id"
        >
          <a
            class="dropdown-item"
            href="#"
            @click="chooseOption(idx, opt)"
          >
            <i :class="`twa twa-30px ${opt.id}`" />
          </a>
        </li>
      </base-dropdown>
    </span>

    <base-button
      v-if="addingAllowed"
      v-b-tooltip.hover.bottom
      style="margin-right: 8px"
      class="btn-tooltip"
      title="Add one more"
      outline
      type="secondary"
      icon="fa fa-plus"
      @click="addOption"
    />
    <base-button
      v-if="selectedOptions.length > 0"
      v-b-tooltip.hover.bottom
      outline
      style="height: 50px"
      class="btn-tooltip"
      title="Start over"
      type="secondary"
      icon="fa fa fa-trash"
      @click="reset"
    />
  </div>
</template>

<script>
export default {
  name: "VotingConfigurator",
  components: {},
  props: {
    maxNumberOfOptions: Number,
    addingAllowed: Boolean
  },
  data () {
    return {
      options: [
        { id: "twa-grinning-face", name: "coffee" },
        { id: "twa-pouting-face", name: "coffee" },
        { id: "twa-red-heart", name: "coffee" },
        { id: "twa-thumbs-up", name: "dislike" },
        { id: "twa-thumbs-down", name: "like" },
        { id: "twa-hot-beverage", name: "coffee" },
        { id: "twa-pile-of-poo", name: "coffee" },
      ],
      selectedOptions: [],
      maxOptions: this.maxNumberOfOptions,
    };
  },
  computed: {},
  methods: {
    chooseOption (idx, option) {
      this.$set(this.selectedOptions, idx, option);
      this.$emit("optionsChanged", { selected: this.selectedOptions.filter(Boolean) });
    },
    unselectOption (idx) {
      this.$set(this.selectedOptions, idx, undefined); // TODO: use an object as dictionary instead (instead of array, as change detection in Vue is not great with arrays)
      this.$emit("optionsChanged", { selected: this.selectedOptions.filter(Boolean) });
    },
    addOption () {
      this.maxOptions += 1;
    },
    reset () {
      this.selectedOptions = [];
      this.maxOptions = this.maxNumberOfOptions;
      this.$emit("optionsChanged", { selected: this.selectedOptions.filter(Boolean) });
    },
    toSvgPath (option) {
      return require(`@/assets/artwork/emojis/svg/${option.id}.svg`);
    }
  }
};
</script>

<style>
.emoji-dropdown {
	min-width: 15px !important;
}
</style>
