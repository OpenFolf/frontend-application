import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import "./sass/variables.scss";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Amplify, * as AmplifyModules from "aws-amplify";
import { Auth /*, Logger */ } from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

//TODO: Remove
Vue.prototype.$log = console.log;

Vue.use(Vuelidate);

Amplify.configure(awsconfig);
Vue.use(Auth);
Vue.use(AmplifyPlugin, AmplifyModules);

Vue.config.productionTip = false;

// =Added 19.4 ErrorHandler=
// Handles all Vue errors
Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info} `);
  console.log(vm);
};

Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(`Warn: ${msg}\nTrace: ${trace}`);
  console.log(vm);
};

// Handles error not produced in Vue such as service.js
window.onerror = function(message, source, lineno, colno, error) {
  console.log("Message: ", message);
  console.log("source: ", source);
  console.log("lineno: ", lineno);
  console.log("colno: ", colno);
  console.log("Exception: ", error);
};

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
