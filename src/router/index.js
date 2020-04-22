import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store";
import Auth from "@/views/Auth.vue";
import Home from "@/views/Home.vue";
import HomeMenu from "@/components/home/Menu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "auth",
    component: Auth,
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
    beforeEnter: async (to, from, next) => {
      await Store.dispatch("fetchCourse", to.params.id);
      next();
    },
  },
  {
    path: "/game/:path/lobby",
    name: "game-lobby",
    component: () => import(/* webpackChunkName: "lobby" */ "@/views/Lobby.vue"), // CHANGE LOCATION to COMPONENTS/GAME
    props: true,
    beforeEnter: async (to, from, next) => {
      await Store.dispatch("createGame", to.params.id);
      Store.dispatch("toggleHideBottomNav");
      next();
    },
  },
  {
    path: "/game/:path/lobby",
    name: "join-lobby",
    component: () => import(/* webpackChunkName: "lobby" */ "@/views/Lobby.vue"), // CHANGE LOCATION to COMPONENTS/GAME
    props: true,
    beforeEnter: (to, from, next) => {
      Store.dispatch("toggleHideBottomNav");
      next();
    },
  },
  {
    //TODO: remove name param
    path: "/game/:path/scorecard",
    name: "game-scorecard",
    component: () => import(/* webpackChunkName: "scorecard" */ "@/views/Scorecard.vue"), // CHANGE LOCATION to COMPONENTS/GAME
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

// Before routing, go through each route and check
router.beforeEach((to, from, next) => {
  //console.log("Router>beforeEach>Route", to.name);
  //console.log("Router>beforeEach>Route, store", Store.getters.signedIn);
  // If signed in
  if (Store.getters.signedIn) {
    //console.log("Router>beforeEach>Route>SignedIn");
    // and at auth then redirect to home-menu
    if (to.matched.some((record) => record.name == "auth")) {
      console.log("Router>beforeEach>Route>SignedIn>to.matched[0].name == 'auth'");
      next({ name: "home-menu" });
    }
    // else, go wherever
    next();
  }
  // If not signed in
  else {
    //console.log("Router>beforeEach>Route>NotSignedIn");
    // redirect to auth if not at auth
    if (!to.matched.some((record) => record.name == "auth")) {
      //console.log("Router>beforeEach>Route>NotSignedIn>!to.matched[0].name == 'auth'");
      next({ name: "auth" });
    }
    next();
  }
});

// async function redirectIfNotAuth(to, from, next) {
//   const user = await getUserState();
//   if (user === null) {
//     next({ name: "auth" });
//   } else {
//     next();
//   }
// }

// function getUserState() {
//   return new Promise((resolve, reject) => {
//     if (Store.state.user === undefined) {
//       const unwatch = Store.watch(
//         () => Store.state.user,
//         (value) => {
//           unwatch();
//           resolve(value);
//         },
//       );
//     } else {
//       resolve(Store.state.user);
//     }
//   });
// }

export default router;
