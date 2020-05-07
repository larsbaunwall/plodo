const {IS_LOCAL_DEV, PACKAGE_VERSION} = require("./build/buildTools");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          `,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: "plodo://./", // Make sure to add "./" to the end of the protocol
      copyright: "Copyright © 2020 plodo, part of thinkability ApS",
      builderOptions: {
        buildVersion: PACKAGE_VERSION,
        publish: IS_LOCAL_DEV 
          ? [] 
          : ["github"],
        protocols: [{
          name: "plodo",
          schemes: ["plodo"]
        }],
        win: {
          appId: "io.plodo.presenter",
          certificateSubjectName:
            "CN = Thinkability ApS, O = Thinkability ApS, STREET = Birk Centerpark 40, L = Herning, S = Midtjylland, PostalCode = 7400, C = DK",
          sign: "./build/sign.js",
          signDlls: !IS_LOCAL_DEV,
          target: ["nsis","portable","appx"],
        },
        appx: {
          backgroundColor: "#FFFFFF",
          publisherDisplayName: "plodo.io",
          artifactName: "plodo-${version}-appx.${ext}"
        },
        mac: {
          appId: "io.plodo.presenter",
          category: "public.app-category.productivity",
          hardenedRuntime : true,
          gatekeeperAssess: false,
          entitlements: "./build/entitlements.mac.plist",
          entitlementsInherit: "./build/entitlements.mac.inherit.plist",
          target: ["pkg", "dmg", "zip", "mas"],
        },
        dmg: {
          sign: false
        },
        mas: {
          extendInfo: {
            ElectronTeamID: "BDGTWK6TNS",
          },
          artifactName: "plodo-${version}-mas.${ext}",
          type: "distribution",
          category: "public.app-category.productivity",
          entitlements: "./build/entitlements.mas.plist",
          entitlementsInherit: "./build/entitlements.mas.inherit.plist",
          provisioningProfile: process.env.PROVISIONING_PROFILE,
        },
        afterSign: "./build/notarize.js",
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
