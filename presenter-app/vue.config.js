module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/scss/bootstrap/_functions.scss";
            @import "@/assets/scss/custom/_functions.scss";

            @import "@/assets/scss/custom/_variables.scss";
            @import "@/assets/scss/bootstrap/_variables.scss";
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
          artifactName: "plodo-{os}.${ext}",
          certificateSubjectName: "CN = Thinkability ApS, O = Thinkability ApS, STREET = Birk Centerpark 40, L = Herning, S = Midtjylland, PostalCode = 7400, C = DK",
          sign: "./sign.js",
          signDlls: true,
        },
        mac: {
          artifactName: "plodo-${os}.${ext}"
        }
      },
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
