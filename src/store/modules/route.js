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

  defaultRouting(context, payload) {
    // Check if user is signed in, if not signed in then route to sign in page
    if (context.rootState.auth.signedIn) {
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "0": // GameStatus = 0 then route to lobby
          Router.push({
            name: "join-lobby",
            params: {
              path: services.replaceIcelandicCharacters(game.course.name),
              id: game.id,
            },
          });
          break;
        case "1": // GameStatus = 1 then route to scorecard
          Router.push({ name: "game-scorecard" });
          break;
        case "-1": // GameStatus = -1 then route to home
          if (payload != "course") {
            Router.push({ name: "home-menu" });
          }
          break;
        default:
          break;
      }
    } else {
      // If not signed in then route to sign in page
      Router.push({ name: "auth" });
    }
  },

  deletePlayerRouting(context) {
    const gamePlayers = context.rootState.game.game.players.items;
    const userId = context.rootState.user.user.id;
    let isUserStillInGame = services.isPlayerInGame(userId, gamePlayers);
    // Check if player has been kicked out of game then trigger routing by removing game object
    if (!isUserStillInGame) {
      // clear game state
      context.dispatch("resetGame");
    }
  },

  inGameRouting(context, payload) {
    // Check if user is signed in, if not signed in then route to sign in page
    if (context.rootState.auth.signedIn) {
      const gameStatus = context.rootState.game.game.gameStatus;
      const game = context.rootState.game.game;
      switch (gameStatus) {
        case "":
          Router.push({ name: "home-menu" });
          break;
        case "0": // GameStatus = 0 then route to lobby
          if (payload != "lobby") {
            Router.push({
              name: "join-lobby",
              params: {
                path: services.replaceIcelandicCharacters(game.course.name),
                id: game.id,
              },
            });
          }
          break;
        case "1": // GameStatus = 1 then route to scorecard
          if (payload != "scorecard") {
            Router.push({ name: "game-scorecard" });
          }
          break;
        case "2": // GameStatus = 2 then route to statspage
          if (payload != "stats") {
            Router.push({ name: "stats" });
          }
          break;
        case "-1": // GameStatus = -1 then route to home
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

  scorecardRouting(context, payload) {
    // Check if user is signed in, if not signed in then route to sign in page
    if (context.rootState.auth.signedIn) {
      const gameStatus = context.rootState.game.game.gameStatus;
      switch (gameStatus) {
        case "": // GameStatus = "" then route to home
          Router.push({ name: "home-menu" });
          break;
        case "1": // GameStatus = 1 then route to scorecard
          if (payload != "scorecard") {
            Router.push({ name: "game-scorecard" });
          }
          break;
        case "2": // GameStatus = 2 then route to stats
          if (payload != "stats") {
            Router.push({ name: "stats" });
          }
          break;
        case "-1": // GameStatus = -1 then route to home
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

  signOutRouting(context) {
    // Check if user is signed in, if not signed in then route to sign in page
    if (!context.rootState.auth.signedIn) {
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
