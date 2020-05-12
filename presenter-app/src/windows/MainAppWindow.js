"use strict";
/* global __static */
import { BrowserWindow, screen } from "electron";
import { platform } from "electron-util";
import Positioner from "electron-positioner";
import path from "path";
import ensurePlodoProtocol from "./windowHelper";
import tray from "./Tray";

let win;
let loadedRoute;

/**
 * @param {String} route
 */
const openAndNavigate = route => {
  if (!win) _createWindow();
  _navigate(win, route);
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
    _positionWindow(win);
    win.show();
    win.focus();
  }
};

/**
 * @param {BrowserWindow} win
 */
const _positionWindow = win => {
  const trayBounds = tray.getTray().getBounds();
  const positioner = new Positioner(win);

  const pos = platform(
    {
      macos: () => { 
        const pos = positioner.calculate("trayCenter", trayBounds);
        return  {x: pos.x, y: pos.y + 4};
      },
      windows: positioner.calculate("trayBottomCenter", trayBounds),
      default: positioner.calculate("center")
    }
  );

  win.setPosition(pos.x, pos.y);
};

const _createWindow = (hideOnBlur = false, hideOnClose = true) => {
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

  _positionWindow();
};

const _navigate = (window, route = "") => {
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
