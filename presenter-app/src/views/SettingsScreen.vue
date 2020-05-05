<template>
  <div>
    <h1 class="title is-5">Celebration settings</h1>
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <b-icon class icon="tv" size="is-small" />
        </div>
        <div class="level-item">Celebration screen</div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <screen-selection-dropdown />
        </div>
      </div>
    </div>
    <hr />
    <div class="content">
      <h1 class="title is-5">Support</h1>
      <p>
        Got an idea for a new feature or want to submit a bug? That is just awesome
        <twemoji cssClass="twa twa-1x" emojis="💪" /> please let us know!
      </p>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">Open an issue on GitHub</div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-secondary is-outlined" @click="openIssue">
              <span>Open issue</span>
              <b-icon icon="external-link-alt" size="is-small" />
            </button>
          </div>
        </div>
      </div>
      <h1 class="title is-5">About</h1>
      <p>plodo started out as an idea to get audiences more involved during online and offline presentations.</p>
      <p>We hope you enjoy it as much as we do building it!</p>
      <h2 class="title is-6">Get involved</h2>
      <p>
        This project is
        <a
          href="https://github.com/larsbaunwall/plodo"
          target="_blank"
          @click.prevent="openExternalBrowser"
        >open source</a>. If you like it, help us by
        <twemoji cssClass="twa twa-1x" emojis="⭐" /> our repo on GitHub or recommend plodo to a friend <twemoji cssClass="twa twa-1x" emojis="❤" />
      </p>
      <!-- <h2 class="title is-6">
        Be a superstar: Support us
        <twemoji cssClass="twa twa-1x" emojis="😎" />
      </h2>
      <p>You can support plodo by donating</p>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { remote } from "electron";
import Twemoji from "../components/Twemoji";
import ScreenSelectionDropdown from "../components/ScreenSelectionDropdown";

export default {
  components: {
    Twemoji,
    ScreenSelectionDropdown,
  },
  methods: {
    openExternalBrowser(e) {
      remote.shell.openExternal(e.target.href);
    },
    openIssue() {
      remote.shell.openExternal(
        "https://github.com/larsbaunwall/plodo/issues/new"
      );
    },
  },
};
</script>

<style>
</style>
