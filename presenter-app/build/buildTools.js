exports.IS_LOCAL_DEV = process.env.VUE_APP_IS_LOCAL_DEV === "true";
exports.PACKAGE_VERSION = require("../package.json").version;