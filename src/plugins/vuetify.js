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
        addedColor: "#009C99",
      },
      dark: {
        primary: "#005737",
        secondary: "#012E33",
        accent: "#1E1E1E",
        error: "#FF7859",
        info: "#008B9C",
        success: "#00A76C",
        warning: "#EEE683",
        addedColor: "#009C99",
      },
    },
  },
  icons: {
    iconfont: "fa",
  },
});
