import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  customVariables: ["~/sass/variables.scss"],
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#005737",
        secondary: "#008B9C",
        accent: "#79AAAC",
        error: "#FF7859",
        info: "#008B9C",
        success: "#00A76C",
        warning: "#EEE683",
        addedColor: "#95B0B5",
        addedBackGround: "#e3ffe3",
        courseInfo: "#627C80",
        lobbyCode: "#79AAAC",
        tableColor: "#83CAC7",
      },
      dark: {
        primary: "#005737",
        secondary: "#012E33",
        accent: "#1E1E1E",
        error: "#FF7859",
        info: "#008B9C",
        success: "#00A76C",
        warning: "#EEE683",
        addedColor: "#95B0B5",
        addedBackGround: "#95B0B5",
        courseInfo: "#627C80",
        lobbyCode: "#008B9C",
        tableColor: "#1E1E1E",
      },
    },
  },
  icons: {
    iconfont: "fa",
  },
});
