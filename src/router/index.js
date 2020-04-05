import Vue from "vue";
import VueRouter from "vue-router";
// import App from "../App.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "App",
  //   component: App,
  // },
  {
    path: "/",
    name: "auth",
    component: () => import("@/views/Auth.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/new-game",
    name: "new-game",
    component: () => import("@/views/NewGame.vue"),
  },
  {
    path: "/join-game",
    name: "join-game",
    component: () => import("@/views/JoinGame.vue"),
  },
  {
    path: "/options",
    name: "options",
    component: () => import("@/views/Options.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
