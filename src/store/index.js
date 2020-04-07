import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import course from "./modules/course";
import user from "./modules/user";
import game from "./modules/game";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    course,
    user,
    game,
  },
});
