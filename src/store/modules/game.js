import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
import * as playergraphQL from "../../graphql/custom/playergraphQL";
import * as services from "../../services/index";
//import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  game: {},
  gamesList: [],
  updatePlayer: {},
};

const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGamesList: (state) => {
    return state.gamesList;
  },
  getUpdatePlayer: (state) => {
    return state.updatePlayer;
  },
  getGameStatus: (state) => {
    return state.game.gameStatus;
  },
};

const mutations = {
  setGame: (state, payload) => {
    console.log("Store>Game>Mutations>SetGame, payload", payload);
    // Go through the array of current players in the game and find the index of the owner
    const indexOfOwner = payload.players.items.findIndex(
      (o) => o.user.email === payload.owner.email,
    );
    // Remove the owner from the list
    const ownerElement = payload.players.items.splice(indexOfOwner, 1);
    // Order the players still in the list alphabetically
    payload.players.items.sort((a, b) => a.no - b.no);
    // Add the owner back to the array, this time to the front of the list
    payload.players.items = [...ownerElement, ...payload.players.items];
    state.game = payload;
  },
  setGamesList: (state, payload) => {
    state.gamesList = payload;
  },
  setUpdatePlayer: (state, payload) => {
    state.updatePlayer = payload;
  },
};

// BREAK: ACTIONS
const actions = {
  async fetchGame(context, payload) {
    console.log("actions>FetchGame", payload);
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.getGame, { id: payload }));
      const game = response.data.getGame;
      console.log("FetchGame", response);
      context.commit("setGame", game);
    } catch (e) {
      console.log("Fetch game error", e);
    }
  },

  async fetchGames(context) {
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.listGames));
      const gamesList = response.data.listGames.items;

      context.commit("setGamesList", gamesList);
    } catch (e) {
      console.log("Fetch games error", e);
    }
  },

  async createGame(context, payload) {
    try {
      const generatedCode = services.getLobbyCode();

      const createGameDetails = {
        gameCourseId: payload,
        gameOwnerId: context.rootState.user.user.id,
        gameStatus: "0",
        lobbyCode: generatedCode,
        gameType: context.rootState.user.user.id + " joined", // Most recent player changes
      };
      // console.log("Game details console log", createGameDetails);
      const gameResponse = await API.graphql(
        graphqlOperation(gamegraphQL.createGame, { input: createGameDetails }),
      );

      const newGame = gameResponse.data.createGame;

      const createPlayerDetails = {
        playerUserId: context.rootState.user.user.id,
        playerGameId: newGame.id,
        scoreArray: [],
      };

      const playerResponse = await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, { input: createPlayerDetails }),
      );

      await newGame.players.items.push(playerResponse.data.createPlayer);

      await context.commit("setGame", newGame);
    } catch (e) {
      console.log("Create game error", e);
    }
  },

  async createPlayer(context, payload) {
    const createPlayerDetails = {
      playerUserId: context.rootState.user.user.id,
      playerGameId: payload,
      scoreArray: [],
    };
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, { input: createPlayerDetails }),
      );
      // Create game object to update game state
    } catch (e) {
      console.log("Create player error", e);
    }
    const updateGameDetails = {
      id: payload,
      gameType: context.rootState.user.user.id + " joined", // Most recent player changes
    };
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      console.log("Update game error", e);
    }
  },

  async deletePlayer(context, payload) {
    const playerId = payload;
    try {
      await API.graphql(graphqlOperation(playergraphQL.deletePlayer, { id: playerId }));
    } catch (e) {
      console.log("Player delete error", e);
    }
    const updateGameDetails = {
      id: payload,
      gameType: context.rootState.user.user.id + " left", // Most recent player changes
    };
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      console.log("Update game error", e);
    }
  },

  async startGame(context) {
    // Change status of game to signal it has started //
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "1",
    };
    console.log(updateGameDetails.id);

    // update the game details with new gamestatus
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      console.log("Update gamestatus error", e);
    }

    //Get the number of holes for current game course
    const holeCount = parseInt(context.rootState.game.game.course.holeCount, 10); //Na i thetta ur state
    //Create new array and initialize to zero for every hole
    const scoreInit = [];
    for (var i = 0; i < holeCount; i++) {
      scoreInit.push("0");
    }

    //For each player in player array call update with the newly created array
    const gamePlayers = context.rootState.game.game.players.items;

    for (i = 0; i < gamePlayers.length; i++) {
      const updateScore = {
        id: gamePlayers[i].id,
        scoreArray: scoreInit,
      };
      try {
        await API.graphql(graphqlOperation(playergraphQL.updatePlayer, { input: updateScore }));
      } catch (e) {
        console.log("Update player error", e);
      }
    }
    //Refresh state of game
    context.dispatch("fetchGame", context.rootState.game.game.id);
  },

  async updatePlayer(context, payload) {
    try {
      await API.graphql(graphqlOperation(playergraphQL.updatePlayer, { input: payload }));
    } catch (e) {
      console.log("update player error", e);
    }
  },

  async subscribeToPlayer(context, payload) {
    const playerId = payload;
    try {
      const subscription = API.graphql(
        graphqlOperation(playergraphQL.onUpdatePlayer, { id: playerId }),
      ).subscribe({
        next: () => context.dispatch("fetchGame", context.rootState.game.game.id),
      });
      console.log("Subscription", subscription);
    } catch (e) {
      console.log("Player subscription error", e);
    }
  },

  async subscribeToGame(context) {
    const gameId = context.rootState.game.game.id;

    try {
      const subscribe = API.graphql(
        graphqlOperation(gamegraphQL.onUpdateGame, { id: gameId }),
      ).subscribe({
        next: () => context.dispatch("fetchGame", gameId),
      });

      console.log("Game subscription: ", subscribe);
    } catch (e) {
      console.log("Game subscription error", e);
    }
  },

  subscribeToPlayerList(context) {
    // Get list of all players in game
    const gamePlayers = context.rootState.game.game.players.items;
    // Subscribe to changes on all players
    for (var i = 0; i < gamePlayers.length; i++) {
      context.dispatch("subscribeToPlayer", gamePlayers[i].id);
      console.log("Subscribing to", gamePlayers[i].id);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
