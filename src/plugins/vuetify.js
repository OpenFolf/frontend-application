import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#012E33",
        secondary: "#076645",
        accent: "#9CB0A4",
        error: "#FF7859",
        info: "#008B9C",
        success: "#3fbb85",
        warning: "#EEE683",
        addedColor: "#009C99",
      },
      dark: {
        primary: "#005737",
        secondary: "#012E33",
        accent: "#2F4858",
        error: "#9B3923",
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

// charcoalLighten4: #647A90;
// charcoalLighten3: #576D83;
// charcoalLighten2: #4B6177;
// charcoalLighten1: #3E546A;
// charcoal: #31475D;
// charcoalDarken1: #243A50;
// charcoalDarken2: #182E44;
// charcoalDarken3: #0B2137;
// charcoalDarken4: #00142A;

// grayLighten4: #679499;
// grayLighten3: #5A878C;
// grayLighten2: #4E7B80;;
// grayLighten1: #416E73;
// gray: #34616;
// grayDarken1: #275459;
// grayDarken2: #1B484D;
// grayDarken3: #0E3B40;
// grayDarken4: #012E33;

// greenLighten4: #6DCCAB;
// greenLighten3: #60BF9E;
// greenLighten2: #54B392;
// greenLighten1: #47A685;
// green: #3A9978;
// greenDarken1:#2D8C6B;
// greenDarken2: #21805F;
// greenDarken3: #147352;
// greenDarken4:#076645;

// mintLighten4: #34616;
// mintLighten3: #34616;
// mintLighten2: #34616;
// mintLighten1:#34616;
// mint: #3fbb85;
// mintDarken1: #34616;
// mintDarken2: #34616;
// mintDarken3:#34616;
// mintDarken4:#34616;
