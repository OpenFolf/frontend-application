import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
//import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  game: {},
};

const getters = {
  getGame: (state) => {
    return state.game;
  },
};

const mutations = {
  setGame: (state, payload) => {
    state.game = payload;
  },
};

const actions = {
  async fetchGame(context, payload) {
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.getGame, { id: payload }));
      const game = response.data;

      context.commit("setGame", game);
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
      const newGame = response;

      context.commit("setGame", newGame);
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
