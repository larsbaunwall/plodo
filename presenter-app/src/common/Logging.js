import log from "electron-log";
console.log = log.log;

const DEBUG = process.env.NODE_ENV !== "production";

const init = () => {
  if(DEBUG){
    log.transports.file.level = "silly";
  } else {
    log.transports.file.level = "warn";
  }

  process.on("uncaughtException", (err, origin) => {
    log.error(`Caught exception: ${err}, origin: ${origin}`);
  });
};

export default { init, log };