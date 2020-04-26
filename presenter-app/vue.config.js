module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          `
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      customFileProtocol: "plodo://./", // Make sure to add "./" to the end of the protocol
      copyright: "Copyright © 2020 plodo, part of thinkability ApS",
      builderOptions: {
        publish: ["github"],
        win: {
          appId: "think.plodo.presenter",
          certificateSubjectName: "CN = Thinkability ApS, O = Thinkability ApS, STREET = Birk Centerpark 40, L = Herning, S = Midtjylland, PostalCode = 7400, C = DK",
          sign: "./sign.js",
          signDlls: true,
          target: [
            {
              target: "nsis"
            },
            {
              target: "portable"
            }
          ]
        },
        mac: {
        }
      },
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
