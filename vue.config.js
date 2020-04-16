module.exports = {
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp("^https://"),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 10,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifestOptions: {
      name: "openFOLF",
      short_name: "openFOLF",
      description: "Disc Golf application. Track your games.",
      theme_color: "#005737",
      background_color: "#005737",
      display: "standalone",
      orientation: "portrait",
      icons: [
        { src: "./img/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "./img/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
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
