module.exports = {
  pwa: {
    manifestOptions: {
      name: "openFOLF",
      short_name: "openFOLF",
      start_url: "/home",
      theme_color: "#005737",
      background_color: "#005737",
      display: "fullscreen",
      orientation: "portrait",
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "openFOLF - Real Time Disc Golf";
      return args;
    });
  },
  transpileDependencies: ["vuetify"],
};
