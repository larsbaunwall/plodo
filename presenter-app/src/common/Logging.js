import electronLog from "electron-log";
import {is} from "electron-util";
console.log = electronLog.log;

const init = () => {
  if(is.development){
    electronLog.transports.file.level = "silly";
  } else {
    electronLog.transports.file.level = "warn";
  }

  process.on("uncaughtException", (err, origin) => {
    electronLog.error(`Caught exception: ${err}, origin: ${origin}`);
  });
};

const log = electronLog.log;
const logger = electronLog;

export default { init, log, logger };