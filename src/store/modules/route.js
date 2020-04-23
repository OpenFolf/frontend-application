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
    if (context.rootState.auth.signedIn) {
      console.log("Router>actions>defaultRouting>signedIn");
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "0":
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
          context.dispatch("showBottomNav", false);
          Router.push({ name: "game-scorecard" });
          break;
        case "-1":
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        default:
          break;
      }
    } else {
      // go to sign in
      Router.push({ name: "auth" });
    }
  },

  deletePlayerRouting(context) {
    const gamePlayers = context.rootState.game.game.players.items;
    const userId = context.rootState.user.user.id;
    let isPlayerInGame = services.isPlayerInGame(userId, gamePlayers);

    if (!isPlayerInGame) {
      // route to home
      context.dispatch("showBottomNav", true);
      Router.push({ name: "home-menu" });
      // clear game state
      context.dispatch("resetGame");
    }
  },

  inGameRouting(context) {
    if (context.rootState.auth.signedIn) {
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "":
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        case "0":
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
          context.dispatch("showBottomNav", false);
          Router.push({ name: "game-scorecard" });
          break;
        case "2":
          context.dispatch("showBottomNav", true);
          Router.push({ name: "game-end-stats" });
          break;
        case "-1":
          context.dispatch("showBottomNav", true);
          Router.push({ name: "home-menu" });
          break;
        default:
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
