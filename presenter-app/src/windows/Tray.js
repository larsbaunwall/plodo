"use strict";
/* global __static */
import { app, Tray, Menu, dialog, BrowserWindow } from "electron";
import { is, openNewGitHubIssue, debugInfo } from "electron-util";
import path from "path";
import mainWindow from "../windows/MainAppWindow";
import updater from "../common/Updater";

let tray;

/**
 * @returns {Tray} existing tray
 */
const getTray = () => {
  return tray;
};

/**
 * @returns {Tray} new tray
 */
const createTray = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: "Toggle plodo",
      click: () => {
        mainWindow.toggleWindow();
      },
    },
    {
      label: "Open DevTools",
      click: () => {
        mainWindow.getWindow().webContents.openDevTools();
      },
      visible: is.development,
    },
    {
      label: "Check for updates",
      click: updater.checkForNewUpdates,
      visible: !is.macAppStore && !is.windowsStore
    },
    {
      label: `plodo v${app.getVersion()}`,
      enabled: false,
    },
    { type: "separator" },
    {
      role: "quit", // "role": system prepared action menu
    },
  ]);

  tray = new Tray(path.join(__static, "icon.png"));
  tray.setToolTip("plodo");

  tray.on("right-click", () => {
    tray.popUpContextMenu(menu);
  });
  tray.on("double-click", mainWindow.toggleWindow);
  tray.on("click", mainWindow.toggleWindow);

  return tray;
};

const destroy = () => {
  if (tray) tray.destroy();
};

export default { createTray, getTray, destroy };
