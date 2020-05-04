require('dotenv').config();
const { notarize } = require('electron-notarize');
const {IS_LOCAL_DEV} = require("./buildTools");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin') return;
  if(IS_LOCAL_DEV) return;

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    appBundleId: 'io.plodo.presenter',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
  });
};