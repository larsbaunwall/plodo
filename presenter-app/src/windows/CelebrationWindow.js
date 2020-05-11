"use strict";
/* global __static */
import { BrowserWindow, screen} from "electron";
import ensurePlodoProtocol from "./windowHelper";
import store from "../store";
import UIService from "../common/UIService";

let win;
let celebrateSubscription = () => {};

/**
 * @returns {BrowserWindow} win
 */
const OpenWindow = () => {
  const savedDisplay = store.getters.allScreens.find(x => x.id === store.getters.celebrationScreen.id);
  if(!savedDisplay) store.dispatch("changeCelebrationScreen", UIService.getPrimaryDisplay());

  const display = store.getters.celebrationScreen;

  win = new BrowserWindow({
    x: display.bounds.x,
    y: display.bounds.y,
    minWidth: display.size.width,
    minHeight: display.size.height,
    width: display.size.width,
    height: display.size.height,
    simpleFullscreen: true,
    useContentSize: true,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    focusable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);
  win.setAlwaysOnTop(true, "screen-saver", 1);

  win.setIgnoreMouseEvents(true);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/celebrate`);
  } else {
    ensurePlodoProtocol();
    // Load the index.html when not in development
    win.loadURL("plodo://./index.html/#/celebrate");
  }

  win.webContents.send("celebration-started");

  return win;
};

const subscribeToCelebration = () => {
  celebrateSubscription();
  celebrateSubscription = store.subscribeAction({
    after: (action, state) => {
      if (action.type === "toggleCelebration") {
        if (state.celebrate) {
          OpenWindow();
        } else {
          destroy();
        }
      }
      if(action.type ==="changeCelebrationScreen") {
        // Destroy and recreate window for now, so TwoJS resizing is not needed
        destroy();
        OpenWindow();
      }
    },
  });
};

const destroy = () => {
  if (win) win.destroy();
};

export default { OpenWindow, subscribeToCelebration, destroy };
