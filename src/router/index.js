import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "@/views/Auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
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
    path: "/stats",
    name: "stats",
    component: () => import("@/views/Stats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
