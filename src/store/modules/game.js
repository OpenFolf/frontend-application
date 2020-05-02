import { API, graphqlOperation } from "aws-amplify";
import * as gamegraphQL from "../../graphql/custom/gamegraphQL";
import * as playergraphQL from "../../graphql/custom/playergraphQL";
import * as services from "../../services/index";

const initialState = () => ({
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
    gameType: "",
  },
  gamesList: [],
  lobbyJoinError: "",
  gameSubscription: "",
  playerSubscription: [],
});

const state = initialState();
// BREAK: Getters
const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGamesList: (state) => {
    return state.gamesList;
  },
  getGameStatus: (state) => {
    return state.game.gameStatus;
  },
  getGameType: (state) => {
    return state.game.gameType;
  },
  getPlayers: (state) => {
    return state.game.players.items;
  },
  getHoles: (state) => {
    return state.game.course.holes.items;
  },
  getLobbyJoinError: (state) => {
    return state.lobbyJoinError;
  },
};
// BREAK: Mutations
const mutations = {
  SET_GAME: (state, payload) => {
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
  SET_GAMESLIST: (state, payload) => {
    state.gamesList = payload;
  },
  SET_SCORE_ARRAY: (state, payload) => {
    state.game.players.items = payload;
  },
  SET_GAME_STATUS: (state, payload) => {
    state.game.gameStatus = payload;
  },
  RESET_GAME(state) {
    // Reset the game object
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  SET_GAME_SUBSCRIPTION(state, payload) {
    state.gameSubscription = payload;
  },
  PUSH_PLAYER_SUBSCRIPTION(state, payload) {
    state.playerSubscription.push(payload);
  },
};
// BREAK: ACTIONS
const actions = {
  //Game actions
  async fetchGame(context, payload) {
    // Receives id of game as payload
    // Fetch game from database
    try {
      const response = await API.graphql(graphqlOperation(gamegraphQL.getGame, { id: payload }));
      const game = response.data.getGame;
      // Add fetched game to state
      context.commit("SET_GAME", game);
    } catch (e) {
      throw Error("Fetch game error", e);
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
        totalScore: "0",
      };
      // Create player in database
      const playerResponse = await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, { input: createPlayerDetails }),
      );
      // Add new player to new game object
      await newGame.players.items.push(playerResponse.data.createPlayer);
      //Add newly created game to state
      await context.commit("SET_GAME", newGame);
    } catch (e) {
      throw Error("Create game error", e);
    }
  },
  async cancelGame(context) {
    //Change status of game to signal it has been cancelled //
    //Update state
    context.commit("SET_GAME_STATUS", "-1");
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "-1",
    };
    //Update the game details with new gameStatus
    try {
      await API.graphql(
        graphqlOperation(gamegraphQL.updateGame, {
          input: updateGameDetails,
        }),
      );
    } catch (e) {
      throw Error("Cancel game error", e);
    }
  },
  async startGame(context) {
    //Change status of game to signal it has started //
    //Update state
    context.commit("SET_GAME_STATUS", "1");
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "1",
    };
    //Update the game details with new gameStatus
    try {
      await API.graphql(
        graphqlOperation(gamegraphQL.updateGame, {
          input: updateGameDetails,
        }),
      );
    } catch (e) {
      throw Error("Update gameStatus error", e);
    }
    //Get the number of holes for current game course
    const holeCount = parseInt(context.rootState.game.game.course.holeCount, 10);
    //Create new array and initialize to zero for every hole
    const scoreInit = [];
    for (var i = 0; i < holeCount; i++) {
      scoreInit.push("0");
    }
    // Store array of players in game
    const gamePlayers = context.rootState.game.game.players.items;
    //For each player in player array call update with the newly created array
    for (i = 0; i < gamePlayers.length; i++) {
      const updateScore = {
        id: gamePlayers[i].id,
        scoreArray: scoreInit,
      };
      try {
        await API.graphql(
          graphqlOperation(playergraphQL.updatePlayer, {
            input: updateScore,
          }),
        );
      } catch (e) {
        throw Error("Update player error", e);
      }
    }
    //Refresh state of game
    context.dispatch("fetchGame", context.rootState.game.game.id);
  },
  async joinGame(context, code) {
    // Get Games from database with matching lobbycode
    try {
      const response = await API.graphql(
        graphqlOperation(gamegraphQL.listGames, {
          filter: { lobbyCode: { eq: code } },
        }),
      );
      const gamesList = response.data.listGames.items;
      // Add list to state
      context.commit("SET_GAMESLIST", gamesList);
      // if gamesList length is 0 then error message 'no such game'
      if (gamesList.length == 0) {
        // Signal to component that no game exists with lobby code
        context.commit("ERROR_MSG", { message: `No game found with the lobby code ${code}` });
      }
      // Sort gamesList by time
      gamesList.sort(function(a, b) {
        return b.gameDate - a.gameDate;
      });
      // check gameStatus on gamesList[0]
      // If gameStatus 0 => create player, fetch game, route to lobby
      if (gamesList[0].gameStatus == 0) {
        // Check if user is part of game if so fetch game to state then route to lobby
        const gamePlayers = gamesList[0].players.items;
        const userId = context.rootState.user.user.id;
        let playerInGame = services.isPlayerInGame(userId, gamePlayers);

        if (playerInGame) {
          // Fetch game object and trigger routing to lobby
          await context.dispatch("fetchGame", gamesList[0].id);
        } else {
          // createPlayer on this game ID
          await context.dispatch("createPlayer", gamesList[0].id);
          // Store game in state which triggers routing to lobby
          await context.dispatch("fetchGame", gamesList[0].id);
        }
      }
      // If gameStatus 1 =>
      if (gamesList[0].gameStatus == 1) {
        // Check if player is part of game if so fetch game to state then route to scorecard
        const gamePlayers = gamesList[0].players.items;
        const userId = context.rootState.user.user.id;
        let playerInGame = services.isPlayerInGame(userId, gamePlayers);
        // If player in game then route to scorecard
        if (playerInGame) {
          context.dispatch("fetchGame", gamesList[0].id);
        } else {
          // Game has already started, too late to join
          context.commit("ERROR_MSG", {
            message: `A game with the lobby code ${code} was found but has already started`,
          });
        }
      }
      // if Gamestatus 2 => error message 'Game already finished'
      if (gamesList[0].gameStatus == 2) {
        // Game has already finished, because there can be many games with the same code in the future, user gets error no game found
        context.commit("ERROR_MSG", { message: `No game found with the lobby code ${code}` });
      }
    } catch (e) {
      throw Error("Fetch Lobby game error", e);
    }
  },
  async finishGame(context) {
    //Change status of game to signal it has ended
    //Update state
    context.commit("SET_GAME_STATUS", "2");
    //Create the object to send to graphQL api, a game has to be in state for this to work
    const updateGameDetails = {
      id: context.rootState.game.game.id,
      gameStatus: "2",
    };
    // update the game details with new gamestatus
    try {
      await API.graphql(graphqlOperation(gamegraphQL.updateGame, { input: updateGameDetails }));
    } catch (e) {
      throw Error("Finish Game error", e);
    }
    // TODO: Turn off all subscribers, check if needed
  },
  resetGame(context) {
    context.commit("RESET_GAME");
  },
  //Player actions
  async createPlayer(context, payload) {
    //Receives gameID as payload
    const createPlayerDetails = {
      playerUserId: context.rootState.user.user.id, //Current user
      playerGameId: payload, //Game to play
      scoreArray: [], //Initialize scoreArray
      totalScore: "0",
    };
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.createPlayer, {
          input: createPlayerDetails,
        }),
      );
    } catch (e) {
      throw Error("Create player error", e);
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
      throw Error("Update game error", e);
    }
  },
  async deletePlayer(context, payload) {
    //Receives playerID as payload and deletes player from database
    const playerId = payload;
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.deletePlayer, {
          input: {
            id: playerId,
          },
        }),
      );
    } catch (e) {
      throw Error("Player delete error", e);
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
      throw Error("Update game error", e);
    }
  },
  async updatePlayer(context, payload) {
    //Receives new score array as payload and updates score in database
    // Calculate totalscore to the payload to add to state along with new array
    const sum = payload.scoreArray.reduce((acc, cur) => parseInt(acc) + parseInt(cur));
    // Get list of all players in game
    const gamePlayers = context.rootState.game.game.players.items;
    // Update scoreArray and totalScore for player to store in state
    for (var i = 0; i < gamePlayers.length; i++) {
      if (payload.id == gamePlayers[i].id) {
        gamePlayers[i].scoreArray = payload.scoreArray;
        gamePlayers[i].totalScore = sum;
      }
    }
    // Set new scorearray in state
    context.commit("SET_SCORE_ARRAY", gamePlayers);
    // Update score for player in database
    payload.totalScore = sum;
    try {
      await API.graphql(
        graphqlOperation(playergraphQL.updatePlayer, {
          input: payload,
        }),
      );
    } catch (e) {
      throw Error("update player error", e);
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
      // Push to subscription array
      context.commit("PUSH_PLAYER_SUBSCRIPTION", subscription);
    } catch (e) {
      throw Error("Player subscription error", e);
    }
  },
  async subscribeToGame(context) {
    //Starts a subscription to any changes on game object in the database
    const gameId = context.state.game.id;
    // Start graphQL subscription
    try {
      const gameSubscription = API.graphql(
        graphqlOperation(gamegraphQL.onUpdateGame, { id: gameId }),
      ).subscribe({
        next: () => context.dispatch("fetchGame", gameId),
      });
      // Store subscription in state
      context.commit("SET_GAME_SUBSCRIPTION", gameSubscription);
    } catch (e) {
      throw Error("Game subscription error", e);
    }
    // Fetch newest info on gameObject
    context.dispatch("fetchGame", gameId);
  },
  async unSubscribeToGame(context) {
    //Unsubscribes to any changes on game object in the database
    try {
      context.state.gameSubscription.unsubscribe();
    } catch (e) {
      throw Error("Game un-subscription error", e);
    }
  },
  subscribeToPlayerList(context) {
    // Start by subscribing to game
    context.dispatch("subscribeToGame");
    // Get list of all players in game
    const gamePlayers = context.rootState.game.game.players.items;
    // Subscribe to changes on all players
    for (let i = 0; i < gamePlayers.length; i++) {
      context.dispatch("subscribeToPlayer", gamePlayers[i].id);
    }
  },
  unSubscribeToPlayerList(context) {
    // Start by un-subscribing to game
    context.dispatch("unSubscribeToGame");
    // Get list of all players in game
    const playerSubscriptions = context.state.playerSubscription;
    // Subscribe to changes on all players
    for (let i = 0; i < playerSubscriptions.length; i++) {
      playerSubscriptions[i].unsubscribe();
    }
  },
  // Refresh actions
  refreshGame(context) {
    // Fetch game object again from database
    const gameId = context.rootState.game.game.id;
    context.dispatch("fetchGame", gameId);
    // Subscribe to all players in game again
    context.dispatch("subscribeToGame");
  },
  refreshLobby(context) {
    // Fetch game object again from database
    const gameId = context.rootState.game.game.id;
    context.dispatch("fetchGame", gameId);
    // Subscribe to all players in game again
    context.dispatch("subscribeToPlayerList");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
