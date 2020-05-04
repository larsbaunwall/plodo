import { app } from "electron";

export default () => {
  if (!app.isDefaultProtocolClient("plodo")) app.setAsDefaultProtocolClient("plodo");
};
