module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "openFOLF - Real Time Disc Golf";
      return args;
    });
  },
  transpileDependencies: ["vuetify"],
};
