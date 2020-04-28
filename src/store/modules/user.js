import { API, graphqlOperation } from "aws-amplify";
import * as usergraphQL from "../../graphql/custom/usergraphQL";
import Vuetify from "../../plugins/vuetify";
import * as services from "../../services/index";

const initialState = () => ({
  user: {
    id: "",
  },
  location: {
    lat: 64.128197,
    lng: -21.885087,
    error: 0,
  },
  userGames: [
    {
      userPlayerId: "",
      gameId: "",
      scoreArray: [],
      userTotalScore: "",
      gameStatus: "",
      gameDate: "",
      gameOwner: {
        ownerId: "",
        ownerUsername: "",
        ownerEmail: "",
      },
      course: {
        courseName: "",
        par: [{ no: "", redPar: "" }],
        totalPar: 0,
      },
      players: [
        {
          user: {
            id: "",
            username: "",
            email: "",
          },
          totalScore: "",
          scoreArray: [],
        },
      ],
    },
  ],
});

const state = initialState();

const getters = {
  getUser: (state) => {
    return state.user;
  },
  getUserId: (state) => {
    return state.user.id;
  },
  getUserName: (state) => {
    return state.user.username;
  },
  getEmail: (state) => {
    return state.user.email;
  },
  getIsUserDark: (state) => {
    return state.user.defMode == "DARK";
  },
  getCurrentGame: (state) => {
    return state.user.currentGame;
  },
  getUserTee: (state) => {
    return state.user.defTee;
  },
  getUserLocation: (state) => {
    return state.location;
  },
  getUserGames: (state) => {
    return state.userGames;
  },
  // getUserHistoryGameListItemPlayerItem: (state) => {
  //   return state.userGames.gamesPlayed.items.game.players.items;
  // },
};

const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
  },
  setUserId: (state, payload) => {
    state.user.id = payload;
  },
  setUserName: (state, payload) => {
    //console.log("User>mutations>setUserName, payload", payload);
    state.user.username = payload;
  },
  setUserEmail: (state, payload) => {
    state.user.email = payload;
  },
  setCurrentGame: (state, payload) => {
    state.user.currentGame = payload;
  },
  setUserTheme: (state, payload) => {
    state.user.defMode = payload;
  },
  setUserDefaultTee: (state, payload) => {
    state.user.defTee = payload;
    //console.log("DefTee", payload);
    //Add to database
  },
  setUserLocation: (state, payload) => {
    state.location.lat = payload.lat;
    state.location.lng = payload.lng;
    state.location.error = payload.error;
  },
  setUserGames: (state, payload) => {
    const gameObjectList = services.reorganizeGameList(payload.gamesPlayed.items);

    if (gameObjectList.length) {
      console.log("setUserGames> gameObjectList", gameObjectList);
      state.userGames = gameObjectList;
    }
  },
  RESET_USER(state) {
    ////console.log("Auth>mutations>RESET_USER");
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

const actions = {
  setUserId: ({ commit }, payload) => {
    //console.log("User>setUserId");
    commit("setUserId", payload);
  },

  resetUser({ commit }) {
    //console.log("Course>Actions>resetUser");
    commit("RESET_USER");
  },
  async setUserName(context, payload) {
    //console.log("User>actions>setUserName, payload", payload);
    // Add to database
    const userId = context.rootState.user.user.id;
    try {
      await API.graphql(
        graphqlOperation(usergraphQL.updateUser, {
          input: { id: userId, username: payload },
        }),
      );
    } catch (e) {
      //console.log("ErrorSETUSERNAME", e);
      context.commit("ERROR_MSG", {
        message: "User name may not contain an empty string or symbols",
      });
    }
    context.commit("setUserName", payload);
  },

  async setUserTheme(context) {
    const userId = context.rootState.user.user.id;
    const userTheme = context.state.user.defMode;
    if (userTheme == "DARK") {
      context.commit("setUserTheme", "LIGHT");
      try {
        await API.graphql(
          graphqlOperation(usergraphQL.updateUser, {
            input: { id: userId, defMode: "LIGHT" },
          }),
        );
      } catch (e) {
        throw Error("Update to LIGHT defMode error: ", e);
      }
      context.commit("setUserTheme", "LIGHT");
      //console.log("Vuetify object: ", Vuetify);
      Vuetify.framework.theme.isDark = false;
    } else {
      context.commit("setUserTheme", "DARK");
      try {
        await API.graphql(
          graphqlOperation(usergraphQL.updateUser, {
            input: { id: userId, defMode: "DARK" },
          }),
        );
      } catch (e) {
        throw Error("Update to DARK defMode error: ", e);
      }
      //console.log("Vuetify object: ", Vuetify);
      context.commit("setUserTheme", "DARK");
      Vuetify.framework.theme.isDark = true;
    }
  },

  async setUserDefaultTee(context, payload) {
    const userId = context.rootState.user.user.id;
    try {
      await API.graphql(
        graphqlOperation(usergraphQL.updateUser, {
          input: { id: userId, defTee: payload },
        }),
      );
    } catch (e) {
      throw Error("Update defTee error: ", e);
    }
    context.commit("setUserDefaultTee", payload);
  },

  setUserLocation: ({ commit }, payload) => {
    commit("setUserLocation", payload);
  },
  async fetchUser(context) {
    //console.log("User>fetchUser");
    try {
      const response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUser, { id: state.user.id }),
      );
      if (response.data.getUser.defMode == "DARK") {
        Vuetify.framework.theme.isDark = true;
      } else {
        Vuetify.framework.theme.isDark = false;
      }
      context.commit("setUser", response.data.getUser);
    } catch (e) {
      throw Error("fetchUserError", e);
    }
  },

  async fetchUserGameList(context) {
    //console.log("Fetch UserGamesList User ID", context.rootState.user.user.id);
    let response = {};
    try {
      response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUserGameList, { id: context.rootState.user.user.id }),
      );
    } catch (e) {
      throw Error("fetchUserGameListError", e);
    }
    context.commit("setUserGames", response.data.getUser);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
