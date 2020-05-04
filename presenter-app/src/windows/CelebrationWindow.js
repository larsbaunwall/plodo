"use strict";
/* global __static */
import { BrowserWindow, screen } from "electron";
import ensurePlodoProtocol from "./windowHelper";
import store from "../store";

let win;
let celebrateSubscription = () => {};

const OpenWindow = (display = screen.getPrimaryDisplay()) => {
  const { width, height } = display.size;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    minWidth: width,
    minHeight: height,
    width: width,
    height: height,
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
  win.setAlwaysOnTop(true, "screen-saver");

  win.setIgnoreMouseEvents(true);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/celebrate`);
  } else {
    ensurePlodoProtocol();
    // Load the index.html when not in development
    win.loadURL("plodo://./index.html/#/celebrate");
  }

  return win;
};

const subscribeToCelebration = () => {
  celebrateSubscription();
  celebrateSubscription = store.subscribeAction({
    after: (action, state) => {
      if (action.type === "toggleCelebration") {
        if (state.celebrate) {
          OpenWindow(screen.getPrimaryDisplay());
        } else {
          destroy();
        }
      }
    },
  });
};

const destroy = () => {
  if (win) win.destroy();
};

export default { OpenWindow, subscribeToCelebration, destroy };
