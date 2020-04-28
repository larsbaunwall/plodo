"use strict";
/* global __static */
import { app, protocol, screen, ipcMain } from "electron";
import manager from "./common/WindowManager";
import store from "./store";
import logging from "./common/Logging";
import ApiService from "./common/ApiService";
import { autoUpdater } from "electron-updater";

const DEBUG = process.env.NODE_ENV !== "production";

ApiService.init();
logging.init();

autoUpdater.logger = logging.log;
autoUpdater.logger.transports.file.level = "info";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null;
let celebrationWin = null;
let tray = null;

const celebrationSub = store.subscribeAction({
  after: (action, state) => {
    if (action.type === "toggleCelebration") {
      if (state.celebrate) {
        if (!celebrationWin) manager.createCelebrationWindow(screen.getPrimaryDisplay());
        celebrationWin.show();
      } else {
        if (celebrationWin) celebrationWin.hide();
      }
    }
  },
});

// Don't show the app in dock
// app.dock.hide();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "plodo", privileges: { secure: true, standard: true } },
]);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    win = createAppWindow(425, 800, "");
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (DEBUG && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      //await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  
  //Wait some time before opening windows on launch, re https://github.com/electron/electron/issues/2170

  tray = manager.createTray(win);

  setTimeout(() => {
    win = manager.createAppWindow(425, 800, "", false, true);
  }, 500);
  
  if (store.getters.celebrate)
    setTimeout(() => {
      celebrationWin = manager.createCelebrationWindow(screen.getPrimaryDisplay());
    }, 3000);

  autoUpdater.checkForUpdatesAndNotify();
});

app.on("before-quit", async () => {
  celebrationSub();
  win.destroy();
  if (celebrationWin) celebrationWin.destroy();
  tray.destroy();
});

// Exit cleanly on request from parent process in development mode.
if (DEBUG) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
