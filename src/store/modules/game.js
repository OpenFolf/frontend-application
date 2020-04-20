import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
import * as playergraphQL from "../../graphql/custom/playergraphQL";
import * as services from "../../services/index";

const state = {
  //Added to prevent render error when the scorecard is refreshed in the browser.
  game: {
    id: "",
    owner: {
      id: "",
      username: "",
      email: "",
    },
    course: {
      id: "",
      name: "",
      holeCount: "",
      holes: {
        items: [
          {
            id: "",
            no: "0",
            redPar: "0",
            whitePar: "0",
            yellowPar: "0",
            bluePar: "0",
            redLength: "0",
            whiteLength: "0",
            yellowLength: "0",
            blueLength: "0",
          },
        ],
      },
    },
    players: {
      items: [
        {
          id: "",
          user: {
            id: "",
            username: "",
            email: "",
          },
          totalScore: null,
          scoreArray: [""],
        },
      ],
    },
    gameStatus: "",
    lobbyCode: "",
    gameDate: "",
  },
  gamesList: [],
  updatePlayer: {}, // DEBUG: ??? ok to delete?
  hideBottomNav: false,
};

// BREAK: Getters
const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGamesList: (state) => {
    return state.gamesList;
  },
  getUpdatePlayer: (state) => {
    // DEBUG: ??? ok to delete?
    return state.updatePlayer;
  },
  getGameStatus: (state) => {
    return state.game.gameStatus;
  },
  getHideBottomNav: (state) => {
    console.log("game>actions>toggleHideBottomNav, ");
    return state.hideBottomNav;
  },
  getPlayers: (state) => {
    return state.game.players.items;
  },
  getHoles: (state) => {
    return state.game.course.holes.items;
  },
};

// BREAK: Mutations
const mutations = {
  setGame: (state, payload) => {
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
  toggleHideBottomNav: (state) => {
    console.log("game>Mutations>toggleHideBottomNav, ");
    state.hideBottomNav = !state.hideBottomNav;
  },
  setScoreArray: (state, payload) => {
    state.game.players.items = payload;
  },
};

// BREAK: ACTIONS
const actions = {
  toggleHideBottomNav: ({ commit }) => {
    console.log("game>actions>toggleHideBottomNav, ");
    commit("toggleHideBottomNav");
  },

  //Game actions
  async fetchGame(context, payload) {
    // Receives id of game as payload

    // Fetch game from database
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.getGame, { id: payload }));
      const game = response.data.getGame;
      // Add fetched game to state
      context.commit("setGame", game);
    } catch (e) {
      console.log("Fetch game error", e);
    }
  },

  async fetchLobbyGame(context, payload) {
    // Functions receives lobbycode as payload
    console.log("Nykominn inn i lobby, payload: ", payload);
    // Get games that match lobbycode and have a status of "0"
    try {
      const response = await API.graphql(
        graphqlOperation(gamegraphQL.listGames, {
          filter: { lobbyCode: { eq: payload } },
        }),
      );
      const gamesList = response.data.listGames.items;

      // Add list to state
      console.log(gamesList);
      context.commit("setGamesList", gamesList);
    } catch (e) {
      console.log("Fetch Lobby game error", e);
    }
  },

  async fetchGames(context) {
    // TODO: Rename fetGameList and fix referencing to it, maybe we should not use this function and use a more targeted query instead

    // Fetches list of all games in database
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.listGames));
      const gamesList = response.data.listGames.items;

      // Add list to state
      context.commit("setGamesList", gamesList);
    } catch (e) {
      console.log("Fetch games error", e);
    }
  },

  async createGame(context, payload) {
    //Receives courseID as payload
    try {
      //Generates a random 3 digit lobbycode
      const generatedCode = services.getLobbyCode();

      //Create object to add to database
      const createGameDetails = {
        gameCourseId: payload, // Course to be played
        gameOwnerId: context.rootState.user.user.id, //User set as owner
        gameStatus: "0", //Gamestatus initialized to "0" to signal game has not been started
        lobbyCode: generatedCode,
        gameType: context.rootState.user.user.id + " joined", //Most recent player changes
        gameDate: "" + Date.now(), //Stores timestamp in unix time
      };
      //Create game in database
      const gameResponse = await API.graphql(
        graphqlOperation(gamegraphQL.createGame, { input: createGameDetails }),
      );
      //Store newly created object
      const newGame = gameResponse.data.createGame;

      //Add owner as player to game
      const createPlayerDetails = {
        playerUserId: context.rootState.user.user.id,
        playerGameId: newGame.id,
        scoreArray: [],
      };

      const playerResponse = await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, { input: createPlayerDetails }),
      );

      await newGame.players.items.push(playerResponse.data.createPlayer);

      //Add newly created game to state
      await context.commit("setGame", newGame);
    } catch (e) {
      console.log("Create game error", e);
    }
  },

  async startGame(context) {
    //Change status of game to signal it has started //
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "1",
    };
    //Update the game details with new gameStatus
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      console.log("Update gameStatus error", e);
    }
    //Get the number of holes for current game course
    const holeCount = parseInt(context.rootState.game.game.course.holeCount, 10);
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
    // TODO: Maybe not needed, subscription should take care of this, check if delete is ok
    context.dispatch("fetchGame", context.rootState.game.game.id);
  },

  async finishGame(context) {
    //Change status of game to signal it has ended
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "2",
    };
    // update the game details with new gamestatus
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      console.log("Finish Game error", e);
    }

    // TODO: Calculate totalscore for each player

    // TODO: Check if subscriber is still active and takes care of this
    //Refresh state of game
    // context.dispatch("fetchGame", context.rootState.game.game.id);

    // TODO: Turn off all subscribers
  },

  //Player actions
  async createPlayer(context, payload) {
    //Receives gameID as payload
    const createPlayerDetails = {
      playerUserId: context.rootState.user.user.id, //Current user
      playerGameId: payload, //Game to play
      scoreArray: [], //Initialize scoreArray
    };
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, {
          input: createPlayerDetails,
        }),
      );
    } catch (e) {
      console.log("Create player error", e);
    }
    //Create object to update game details
    const updateGameDetails = {
      id: payload,
      gameType: context.rootState.user.user.id + " joined", //Most recent player changes
    };
    try {
      await API.graphql(
        graphqlOperation(gamegraphQL.updateGame, {
          input: updateGameDetails,
        }),
      );
    } catch (e) {
      console.log("Update game error", e);
    }
  },

  async deletePlayer(context, payload) {
    //Receives playerID as payload and deletes player from database
    const playerId = payload;
    console.log("Player to delete: ", playerId);
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.deletePlayer, {
          input: {
            id: playerId,
          },
        }),
      );
    } catch (e) {
      console.log("Player delete error", e);
    }
    //Create object to update game details
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameType: playerId + " left", // Most recent player changes
    };
    try {
      await API.graphql(
        graphqlOperation(gamegraphQL.updateGame, {
          input: updateGameDetails,
        }),
      );
    } catch (e) {
      console.log("Update game error", e);
    }
  },

  async updatePlayer(context, payload) {
    //Receives new score array as payload and updates score in database
    // TODO: Add totalscore to the payload to add to state along with new array
    // Get list of all players in game
    const gamePlayers = context.rootState.game.game.players.items;
    // Update scoreArray for player to store in state
    for (var i = 0; i < gamePlayers.length; i++) {
      if (payload.id == gamePlayers[i].id) {
        gamePlayers[i].scoreArray = payload.scoreArray;
      }
    }
    console.log("gamePlayers: ", gamePlayers);
    // Set new scorearray in state
    context.commit("setScoreArray", gamePlayers);
    // Update score for player in database
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.updatePlayer, {
          input: payload,
        }),
      );
    } catch (e) {
      console.log("update player error", e);
    }
  },

  //Subscription actions
  async subscribeToPlayer(context, payload) {
    //Receives playerId as payload and starts subscription to any changes on that object in the database
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
    //Starts a subscription to any changes on game object in the database
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

  refreshGame(context) {
    // The refresh button works and is connected. Unable to console.log this statement, donno why, but if I for example commit to some function it will call it.

    return console.log("Cl> Store>Game>Actions>refreshGame", context.rootState.game.game);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
