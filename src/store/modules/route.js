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
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "0":
          Router.push({
            name: "join-lobby",
            params: {
              path: services.replaceIcelandicCharacters(game.course.name),
              id: game.id,
            },
          });
          break;
        case "1":
          Router.push({ name: "game-scorecard" });
          break;
        case "-1":
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
    let isUserStillInGame = services.isPlayerInGame(userId, gamePlayers);

    if (!isUserStillInGame) {
      // Router.push({ name: "home-menu" });
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
          Router.push({ name: "home-menu" });
          break;
        case "0":
          Router.push({
            name: "join-lobby",
            params: {
              path: services.replaceIcelandicCharacters(game.course.name),
              id: game.id,
            },
          });
          break;
        case "1":
          Router.push({ name: "game-scorecard" });
          break;
        case "2":
          Router.push({ name: "stats" });
          break;
        case "-1":
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
