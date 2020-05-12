import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import {activeWindow} from "electron-util";
import logging from "../common/Logging";

let updater;
//autoUpdater.autoDownload = false;

autoUpdater.on("error", error => {
  logging.log("Error downloading updates", error);
  dialog.showErrorBox("Error downloading updates", error == null ? "unknown" : (error.stack || error).toString());
});

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(
    activeWindow(),
    {
      type: "info",
      title: "Found Updates",
      message: "Found updates, do you want update now?",
      buttons: ["Sure", "No"],
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater.enabled = true;
        updater = null;
      }
    }
  );
});

autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox(activeWindow(), {
    title: "No Updates",
    message: "Current version is up-to-date.",
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(
    activeWindow(),
    {
      title: "Install Updates",
      message: "Updates downloaded, application will be quit for update...",
    },
    () => {
      setImmediate(() => autoUpdater.quitAndInstall());
    }
  );
});

// export this to MenuItem click callback
const checkForNewUpdates = (menuItem, focusedWindow, event) => {
  updater = menuItem;
  updater.enabled = false;
  autoUpdater.checkForUpdates();
};

export default { checkForNewUpdates };
