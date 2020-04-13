import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
import * as playergraphQL from "../../graphql/custom/playergraphQL";
//import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  game: {},
  gamesList: [],
};

const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGamesList: (state) => {
    return state.gamesList;
  },
};

const mutations = {
  setGame: (state, payload) => {
    state.game = payload;
  },
  setGamesList: (state, payload) => {
    state.gamesList = payload;
  },
};

const actions = {
  async fetchGame(context, payload) {
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.getGame, { id: payload }));
      const game = response.data.getGame;

      context.commit("setGame", game);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async fetchGames(context) {
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.listGames));
      const gamesList = response.data.listGames.items;

      context.commit("setGamesList", gamesList);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async createGame(context, payload) {
    try {
      const createGameDetails = {
        gameCourseId: payload,
        gameOwnerId: context.rootState.user.user.id,
        gameStatus: "0",
      };
      console.log("Game details console log", createGameDetails);
      const response = await API.graphql(
        graphqlOperation(gamegraphQL.createGame, { input: createGameDetails }),
      );
      const newGame = response.data.createGame;

      context.commit("setGame", newGame);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async createPlayer(context, payload) {
    try {
      const createPlayerDetails = {
        playerUserId: context.rootState.user.user.id,
        playerGameId: payload,
      };

      const response = await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, { input: createPlayerDetails }),
      );
      console.log("Response", response);
    } catch (e) {
      console.log("Error", e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
