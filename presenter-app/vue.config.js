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
      customFileProtocol: "plodo://./", // Make sure to add "./" to the end of the protocol
      copyright: "Copyright © 2020 plodo, part of thinkability ApS",
      builderOptions: {
        publish: ["github"],
        win: {
          appId: "io.plodo.presenter",
          certificateSubjectName:
            "CN = Thinkability ApS, O = Thinkability ApS, STREET = Birk Centerpark 40, L = Herning, S = Midtjylland, PostalCode = 7400, C = DK",
          sign: "./build/sign.js",
          signDlls: true,
          target: [
            {
              target: "nsis",
            },
            {
              target: "portable",
            },
          ],
        },
        mac: {
          appId: "io.plodo.presenter",
          category: "public.app-category.productivity",
          hardenedRuntime : true,
          gatekeeperAssess: false,
          entitlements: "./build/entitlements.mac.plist",
          entitlementsInherit: "./build/entitlements.mac.plist",
          target: ["pkg", "dmg", "zip", "mas"],
        },
        dmg: {
          sign: false
        },
        mas: {
          type: "distribution",
          category: "public.app-category.productivity",
          entitlements: "./build/entitlements.mas.plist",
        },
        afterSign: "./build/notarize.js",
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
