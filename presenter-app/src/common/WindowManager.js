"use strict";
/* global __static */
import { app, BrowserWindow, dialog, screen, Tray, Menu } from "electron";
import path from "path";
import { createProtocol, installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
import { autoUpdater } from "electron-updater";
import log from "electron-log";
autoUpdater.logger = log;

const DEBUG = process.env.NODE_ENV !== "production";
let createdAppProtocol = false;
let tray;

const showUpdateDialog = async (mainWindow) => {

  try {
    const result = await autoUpdater.checkForUpdates();

    const message = `${result.updateInfo.version} is the latest version.\nYour version is ${app.getVersion()}.\n\nDo you want to update?`;
  
    const clicked = await dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Update plodo",
      buttons: ["Yes, quit and update now", "Later"],
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

const createTray = mainWindow => {
  const menu = Menu.buildFromTemplate([
    {
      label: "Open plodo",
      click: () => {
        toggleWindow(mainWindow);
      },
    },
    {
      label: "Check for updates",
      click: async () => {
        await showUpdateDialog(mainWindow);
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
  tray.on("double-click", () => toggleWindow(mainWindow));
  tray.on("click", event => {
    toggleWindow(mainWindow);
    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({ mode: "detach" });
    }
  });

  return tray;
};

const toggleWindow = win => {
  if (win.isVisible()) {
    win.hide();
  } else {
    showWindow(win);
  }
};

const showWindow = win => {
  const position = getWindowPosition(win);
  win.setPosition(position.x, position.y, false);
  win.show();
  win.focus();
};

const getWindowPosition = win => {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getBounds();

  if (process.platform === "darwin") {
    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2);

    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4);

    return { x: x, y: y };
  } else {
    //Windows - center on screen
    const display = screen.getPrimaryDisplay().workAreaSize;
    return {
      x: display.width / 2 - windowBounds.width / 2,
      y: display.height / 2 - windowBounds.height / 2,
    };
  }
};

const createAppWindow = (width, height, urlPath, hideOnBlur = false, hideOnClose = false) => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__static, "icon.png"),
    frame: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}${urlPath}`);
  } else {
    ensurePlodoProtocol();
    // Load the index.html when not in development
    win.loadURL(`plodo://./index.html${urlPath}`);
  }

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

  return win;
};

const createCelebrationWindow = (display = screen.getPrimaryDisplay()) => {
  const { width, height } = display.size;

  const win = new BrowserWindow({
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

const ensurePlodoProtocol = () => {
  if(!createdAppProtocol)
  {
    createProtocol("plodo");
    createdAppProtocol = true;
  }
};

export default { createAppWindow, createCelebrationWindow, createTray };
