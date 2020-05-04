"use strict";
/* global __static */
import { app, Tray, Menu } from "electron";
import path from "path";
import mainWindow from "../windows/MainAppWindow";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

autoUpdater.logger = log;

let tray;

const getTray = () => { return tray; };

const createTray = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: "Open plodo",
      click: () => {
        mainWindow.openAndNavigate();
      },
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
  tray.setContextMenu(menu);

  tray.on("right-click", tray.popUpContextMenu);
  tray.on("double-click", () => mainWindow.toggleWindow());
  tray.on("click", event => {
    mainWindow.toggleWindow();

    // if(DEBUG)
    //   mainWindow.openDevTools({ mode: "detach" });

    // // Show devtools when command clicked
    // if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
    //   //mainWindow.openDevTools({ mode: "detach" });
    // }
  });

  return tray;
};

const destroy = () => {if(tray) tray.destroy();};


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
