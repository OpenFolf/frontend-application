import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
import * as playergraphQL from "../../graphql/custom/playergraphQL";
import * as services from "../../services/index";
//import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  game: {},
  gamesList: [],
  subscriptionList: "Typpi",
  joinedPlayer: {},
};

const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGamesList: (state) => {
    return state.gamesList;
  },
  getSubscriptionList: (state) => {
    return state.subscriptionList;
  },
  getJoinedPlayer: (state) => {
    return state.joinedPlayer;
  },
};

const mutations = {
  setGame: (state, payload) => {
    state.game = payload;
  },
  setGamesList: (state, payload) => {
    state.gamesList = payload;
  },
  setSubscriptionList: (state, payload) => {
    state.subscriptionList = payload;
  },
  joinPlayerToGame: (state, payload) => {
    state.joinedPlayer = payload;
  },
};

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
      };
      // console.log("Game details console log", createGameDetails);
      const gameResponse = await API.graphql(
        graphqlOperation(gamegraphQL.createGame, { input: createGameDetails }),
      );

      const newGame = gameResponse.data.createGame;

      const createPlayerDetails = {
        playerUserId: context.rootState.user.user.id,
        playerGameId: newGame.id,
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
      console.log("Create player error", e);
    }
  },

  async startGame(context) {
    // Change status of game to signal it has started
    const updateGameDetails = {
      id: "67cf5d7b-bbc9-4c16-ba5d-b4cee84a329a", //context.rootState.game.game.id,
      gameStatus: "1",
    };

    try {
      const response = await API.graphql(
        graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }),
      );
      console.log(response);
      context.commit("setGame", response);
    } catch (e) {
      console.log("Update game error", e);
    }
    const holeCount = 9; //Na i thetta ur state
    
    //Create new array
    const scoreInit = [];

    for (var i = 0; i < holeCount; i++) {
      scoreInit.push("0");
    }

    
    //For each player in player array call update with the newly created array
    // const gamePlayers = state.game.players.items;

    // const player = gamePlayers[0];
    // const updateScore = {
    //   id: player.id,
    //   scoreArray: scoreInit,
    // };

    
    // console.log(updateScore, context);

    // try {
    //   const response = await API.graphql(
    //     graphqlOperation(playergraphQL.updatePlayer, { input: updateScore }),
    //   );
    //   console.log("Response", response);
    // } catch (e) {
    //   console.log("Update game error", e);
    // }

    // context.dispatch("fetchGame", "67cf5d7b-bbc9-4c16-ba5d-b4cee84a329a");
  },

  // Test fyrir subscription a game object
  //   async subscribeGames(context) {
  //     const games = API.graphql(graphqlOperation(gamegraphQL.onCreateGame)).subscribe({
  //       next: (gameData) => context.commit("setSubscriptionList", gameData),
  //     });

  //     console.log(games);
  //   },

  async subscribeGames(context) {
    const games = API.graphql(graphqlOperation(gamegraphQL.onUpdateGame)).subscribe({
      next: (gameData) => context.commit("setSubscriptionList", gameData.value.data.onUpdateGame),
    });

    console.log(games);
  },

  async lobbySubscription(context) {
    const playerId = "70c636bf-dc47-4de8-ace8-ae47d4c9ce71";
    const player = API.graphql(
      graphqlOperation(playergraphQL.onUpdatePlayer, { id: playerId }),
    ).subscribe({
      next: (updatedPlayer) => context.commit("joinPlayerToGame", updatedPlayer),
    });

    console.log(player);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
