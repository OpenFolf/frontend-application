// import { API, graphqlOperation } from "aws-amplify";
// import * as usergraphQL from "../../graphql/custom/usergraphQL";
import Router from "@/router";
import * as services from "../../services/index";

const state = {
  hideBottomNav: false,
};

const getters = {
  getBottomNav: (state) => {
    return state.hideBottomNav;
  },
};

const mutations = {
  showBottomNav: (state, payload) => {
    state.hideBottomNav = payload;
  },
};

const actions = {
  showBottomNav: ({ commit }, payload) => {
    commit("showBottomNav", payload);
  },

  defaultRouting(context) {
    console.log(context);
    console.log("Router>actions>defaultRouting");
    console.log(
      "Router>actions>defaultRouting, context.rootState.auth.signedIn ",
      context.rootState.auth.signedIn,
    );
    console.log(
      "Router>actions>defaultRouting, context.rootState.game.game ",
      context.rootState.game.game,
    );
    // TODO: Add watcher on gameStatus that calls this function, put watcher on Home, JoinGame, Course, Stats, etc.

    // If not signedIn then route to sign in page

    // If gameStatus "0" route user to lobby and sets nav bar as false
    // If gameStatus "1" then route user to scorecard set nav bar as false

    // If gameStatus "-1" then route to home, then re-initialize game object in state set nav bar as true
    //
    if (context.rootState.auth.signedIn) {
      console.log("Router>actions>defaultRouting>signedIn");
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "0":
          console.log("Router>actions>defaultRouting>signedIn, case 0");
          context.dispatch("showBottomNav", false);
          Router.push({
            name: "join-lobby",
            params: {
              path: services.replaceIcelandicCharacters(game.course.name),
              id: game.id,
            },
          });
          break;
        case "1":
          console.log("Router>actions>defaultRouting>signedIn, case 1");
          context.dispatch("showBottomNav", false);
          Router.push({ name: "game-scorecard" });
          break;
        case "-1":
          console.log("Router>actions>defaultRouting>signedIn, case 2");
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        default:
          console.log("Router>actions>defaultRouting>signedIn, case default");
          break;
      }
    } else {
      // go to sign in
      console.log("Router>actions>defaultRouting>NOTsignedIn");
      Router.push({ name: "auth" });
    }
  },

  inGameRouting(context) {
    console.log(context);
    console.log("Router>actions>inGameRouting");
    // TODO: Add watcher on gameStatus that calls this function, put watcher on Lobby and Scorecard
    // If not signedIn then route to sign in page
    // If gameStatus " " then route to home nva bar true
    // If gameStatus "0" route user to lobby nav bar false
    // If gameStatus "1" then route user to scorecard nav bar false
    // If gameStatus "2" then open finish game modal, then route user to stats, then re-initialize game object in state nav bar true
    // If gameStatus "-1" then open the game has been cancelled modal then route to home, then re-initialize game object in state nav bar true
    if (context.rootState.auth.signedIn) {
      console.log("Router>actions>inGameRouting>signedIn");
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "":
          console.log("Router>actions>inGameRouting>signedIn, case ''");
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        case "0":
          console.log("Router>actions>inGameRouting>signedIn, case 0");
          context.dispatch("showBottomNav", false);
          Router.push({
            name: "join-lobby",
            params: {
              path: services.replaceIcelandicCharacters(game.course.name),
              id: game.id,
            },
          });
          break;
        case "1":
          console.log("Router>actions>inGameRouting>signedIn, case 1");
          context.dispatch("showBottomNav", false);
          Router.push({ name: "game-scorecard" });
          break;
        case "2":
          console.log("Router>actions>inGameRouting>signedIn, case 2");
          context.dispatch("showBottomNav", true);
          Router.push({ name: "game-end-stats" });
          break;
        case "-1":
          console.log("Router>actions>inGameRouting>signedIn, case -1");
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        default:
          console.log("Router>actions>inGameRouting>signedIn, case default");
          break;
      }
    } else {
      // go to sign in
      Router.push({ name: "auth" });
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
