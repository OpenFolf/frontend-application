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
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
  },
  {
    path: "/new-game",
    name: "new-game",
    component: () => import(/* webpackChunkName: "new-game" */ "@/views/NewGame.vue"),
  },
  {
    path: "/lobby",
    name: "lobby",
    component: () => import(/* webpackChunkName: "lobby" */ "@/views/Lobby.vue"),
  },
  {
    path: "/scorecard",
    name: "scorecard",
    component: () => import(/* webpackChunkName: "scorecard" */ "@/views/Scorecard.vue"),
  },
  {
    path: "/join-game",
    name: "join-game",
    component: () => import(/* webpackChunkName: "join-game" */ "@/views/JoinGame.vue"),
  },

  {
    path: "/stats",
    name: "stats",
    component: () => import(/* webpackChunkName: "stats" */ "@/views/Stats.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
