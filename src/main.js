import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Amplify, * as AmplifyModules from "aws-amplify";
import { Auth, Logger } from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import { AmplifyEventBus } from "aws-amplify-vue";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
Vue.use(Auth);
Vue.use(AmplifyPlugin, AmplifyModules);

Amplify.Logger.LOG_LEVEL = "DEBUG";
const logger = new Logger("main");
Auth.currentAuthenticatedUser()
  .then((user) => logger.debug(user))
  .catch((err) => logger.debug(err));

Vue.config.productionTip = false;

AmplifyEventBus.$on("authState", (info) => {
  console.log(`AUTH: event emitted by an Amplify component: ${info}`);
  if (info === "signedIn") {
    store.dispatch("setSignedIn", true);
    Auth.currentAuthenticatedUser()
      .then((data) => {
        if (data && data.signInUserSession) {
          store.dispatch("setUser", data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
