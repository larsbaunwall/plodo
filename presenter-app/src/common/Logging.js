import electronLog from "electron-log";
console.log = electronLog.log;

const DEBUG = process.env.NODE_ENV !== "production";

const init = () => {
  if(DEBUG){
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