import { createApp } from "vue";
import { createPinia } from "pinia";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faCog,
  faBullhorn,
  faAngleUp,
  faAngleDown,
  faQuestion,
  faUndo,
  faCopy,
  faSignOutAlt,
  faTv,
  faAsterisk,
  faInfoCircle,
  faSpinner,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/plodo.scss";

// Add FontAwesome icons to library
library.add(
  faPlay,
  faCog,
  faBullhorn,
  faAngleUp,
  faAngleDown,
  faQuestion,
  faUndo,
  faCopy,
  faSignOutAlt,
  faTv,
  faAsterisk,
  faInfoCircle,
  faSpinner,
  faExternalLinkAlt
);

const app = createApp(App);

// Register FontAwesome component globally (for Buefy)
app.component("vue-fontawesome", FontAwesomeIcon);

// Configure Buefy with FontAwesome integration like original app
app.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

app.use(createPinia());
app.use(router);

app.mount("#app");
