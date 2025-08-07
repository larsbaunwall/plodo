import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
  faXmark,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
} from '@fortawesome/free-regular-svg-icons';

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
  faExternalLinkAlt,
  faXmark,
  faPlus,
  faTimes,
  faHeart
);

const app = createApp(App);
const pinia = createPinia();

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.use(router);

app.mount('#app');
