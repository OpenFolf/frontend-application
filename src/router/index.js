import Vue from "vue";
import VueRouter from "vue-router";
import Store from "@/store";
import Auth from "@/views/Auth.vue";
import Home from "@/views/Home.vue";
import HomeMenu from "@/components/home/Menu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
    beforeEnter: (to, from, next) => {
      if (Store.getters.getSignedIn) {
        next({ name: "home-menu" });
      } else {
        next();
      }
    },
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        name: "home-menu",
        component: HomeMenu,
      },
      {
        path: "/home/profile",
        name: "home-profile",
        component: () => import(/* webpackChunkName: "profile" */ "@/components/home/Profile.vue"),
      },
      {
        path: "/home/privacy",
        name: "home-privacy",
        component: () => import(/* webpackChunkName: "privacy" */ "@/components/home/Privacy.vue"),
      },
      {
        path: "/home/rules",
        name: "home-rules",
        component: () => import(/* webpackChunkName: "rules" */ "@/components/home/Rules.vue"),
      },
      {
        path: "/home/location",
        name: "home-location",
        component: () =>
          import(/* webpackChunkName: "location" */ "@/components/home/Location.vue"),
      },
    ],
  },
  {
    path: "/game",
    name: "game",
    component: () => import(/* webpackChunkName: "game" */ "@/views/Game.vue"),
  },
  {
    path: "/game/:path",
    name: "game-course",
    component: () => import(/* webpackChunkName: "game-course" */ "@/components/game/Course.vue"),
    props: true,
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from, next) => {
      return new Promise((resolve) => {
        resolve(Store.dispatch("fetchCourse", to.params.id));
      }).then(() => next());
    },
  },
  {
    path: "/game/:path/lobby",
    name: "game-lobby",
    component: () => import(/* webpackChunkName: "lobby" */ "@/views/Lobby.vue"), // CHANGE LOCATION to COMPONENTS/GAME
    props: true,
    // Don't need this anymore, we now call from the component directly to services
    // beforeEnter: (to, from, next) => {
    //   console.log("BeforeEnter, game", to.params.id);
    //   return new Promise((resolve) => {
    //     resolve(Store.dispatch("createGame", to.params.id));
    //   }).then(() => next());
    // },
  },
  {
    path: "/game/:path/scorecard",
    name: "game-scorecard",
    component: () => import(/* webpackChunkName: "scorecard" */ "@/views/Scorecard.vue"), // CHANGE LOCATION to COMPONENTS/GAME
    props: true,
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
  {
    path: "*",
    redirect: { name: "auth" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
