"use strict";
/* global __static */
import { app, Tray, Menu, dialog, BrowserWindow } from "electron";
import path from "path";
import mainWindow from "../windows/MainAppWindow";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

const DEBUG = process.env.NODE_ENV !== "production";

autoUpdater.logger = log;

let tray;

/**
 * @returns {Tray} existing tray
 */
const getTray = () => { return tray; };


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
      visible: DEBUG
    },
    {
      label: "Check for updates",
      click: async () => {
        await showUpdateDialog(mainWindow.getWindow());
      },
    },
    {
      label: `plodo v${app.getVersion()}`,
      enabled: false
    },
    { type: "separator" },
    {
      role: "quit" // "role": system prepared action menu
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

const destroy = () => {if(tray) tray.destroy();};


/**
 * @param {BrowserWindow} mainWindow
 */
const showUpdateDialog = async (mainWindow) => {
  try {
    const result = await autoUpdater.checkForUpdates();

    const message = `A new version of plodo is available 🎉!\n\nVersion ${result.updateInfo.version} is available.\nYour version is ${app.getVersion()}.\n\nDo you want to update?`;
  
    const clicked = await dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Update plodo",
      buttons: ["Yes, update when I close plodo", "Later"],
      cancelId: 1,
      message : message
    });  

    if(clicked === 0)
      await autoUpdater.quitAndInstall();
  } catch (err) {
    await dialog.showMessageBox(mainWindow, {
      type: "error",
      title: "Error looking for update",
      message : err.message
    });
  }
};

export default { createTray, getTray, destroy };
