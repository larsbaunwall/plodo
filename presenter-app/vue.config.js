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
      customFileProtocol: "plodo://./" // Make sure to add "./" to the end of the protocol
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
};
