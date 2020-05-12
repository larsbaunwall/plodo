require("dotenv").config();
exports.IS_LOCAL_DEV = process.env.IS_LOCAL === "true";
exports.PACKAGE_VERSION = require("../package.json").version;