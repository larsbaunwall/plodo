import { screen } from "electron";
import store from "../store";

const init = () => {
  store.dispatch("enumerateScreens");

  //If active screen is no longer available, default to primary display
  if(!store.getters.allScreens.find(x => x.id === store.getters.celebrationScreen.id))
    store.dispatch("changeCelebrationScreen", getPrimaryDisplay());

  //TODO: Change celebration screen if display is removed (implement this in CelebrationWindow modulef)
  screen.on("display-added", (evt, display) => store.dispatch("enumerateScreens"));
  screen.on("display-removed", (evt, display) => store.dispatch("enumerateScreens"));
  screen.on("display-metrics-changed", (evt, display) => store.dispatch("enumerateScreens"));
};


/**
 * @returns {{id, size, bounds, isPrimary}[]} all displays
 */
const getAllDisplays = () => {
  const primary = getPrimaryDisplay();
  return screen.getAllDisplays().map(display => {
    return {
      id: display.id,
      size: {
        width: display.size.width,
        height: display.size.height,
      },
      bounds: {
        x: display.bounds.x,
        y: display.bounds.y
      },
      isPrimary: display.id === primary.id,
    };
  });
};

/**
 * @returns {{id, size, bounds, isPrimary}} the primary display
 */
const getPrimaryDisplay = () => {
  const display = screen.getPrimaryDisplay();

  return {
    id: display.id,
    size: {
      width: display.size.width,
      height: display.size.height,
    },
    bounds: {
      x: display.bounds.x,
      y: display.bounds.y
    },
    isPrimary: true,
  };
};

export default { init, getAllDisplays, getPrimaryDisplay };
