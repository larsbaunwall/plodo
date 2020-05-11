"use strict";
/* global __static */
import { BrowserWindow, screen } from "electron";
import { is } from "electron-util";
import Positioner from "electron-positioner";
import path from "path";
import ensurePlodoProtocol from "./windowHelper";
import logging from "../common/Logging";
import tray from "./Tray";

let win;
let loadedRoute;
const isMac = process.platform === "darwin";

/**
 * @param {String} route
 */
const openAndNavigate = route => {
  if (!win) createWindow();
  navigate(win, route);
  showWindow();
};

const toggleWindow = () => {
  if (win.isVisible()) {
    win.hide();
  } else {
    showWindow();
  }
};

/**
 * @returns{BrowserWindow} window
 */
const getWindow = () => win;

const showWindow = () => {
  if (!win.isVisible()) {
    const position = getWindowPosition(win);
    win.setPosition(Math.round(position.x), Math.round(position.y), false);
    win.show();
    win.focus();
  }
};

/**
 * @param {BrowserWindow} win
 * @returns {{x:Number, y:Number}}
 */
const getWindowPosition = win => {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getTray().getBounds();
  const positioner = new Positioner(win);

  if (is.macos) {
    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);
    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4);
    return { x: x, y: y };
  } else {
    return positioner.calculate("trayBottomCenter", trayBounds);
  }
};

const createWindow = (hideOnBlur = false, hideOnClose = true) => {
  const height = 715;
  const width = 400;

  // Create the browser window.
  win = new BrowserWindow({
    title: "Welcome",
    width: width,
    height: height,
    maximizable: false,
    icon: path.join(__static, "icon.png"),
    frame: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenu(null);

  win.on("blur", () => {
    if (hideOnBlur && !win.webContents.isDevToolsOpened()) {
      win.hide();
    }
  });

  win.on("close", event => {
    if (hideOnClose) {
      //Do not close window on x
      event.preventDefault();
      win.hide();
    }
  });

  const position = getWindowPosition(win);
  win.setPosition(Math.round(position.x), Math.round(position.y), false);
};

const navigate = (window, route = "") => {
  if (route != loadedRoute) {
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      window.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}${route}`);
    } else {
      ensurePlodoProtocol();
      // Load the index.html when not in development
      window.loadURL(`plodo://./index.html${route}`);
    }

    loadedRoute = route;
  }
};

const destroy = () => {
  if (win) win.destroy();
};

export default { openAndNavigate, toggleWindow, getWindow, destroy };
