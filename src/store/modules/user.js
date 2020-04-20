import { API, graphqlOperation } from "aws-amplify";
import * as usergraphQL from "../../graphql/custom/usergraphQL";

const state = {
  user: {
    id: "",
  },
  location: {
    lat: 64.128197,
    lng: -21.885087,
    error: 0,
  },
  userGames: [],
};

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
  getCurrentGame: (state) => {
    return state.user.currentGame;
  },
  getUserTee: (state) => {
    return state.user.defTee;
  },
  // getUserLocation: (state) => {
  //   return state.user.location;
  // },
  getUserLocation: (state) => {
    return state.location;
  },
  getUserGames: (state) => {
    // TODO: Breyta gognum fyrir component, t.d. rada eftir timestamp rod, pikka ut naudsynlegar upplysingar o.s.frv.

    // Add some brilliant code here

    return state.userGames;
  },
};

const mutations = {
  setUser: (state, payload) => {
    state.user = payload;
  },
  setUserId: (state, payload) => {
    state.user.id = payload;
  },
  setUserName: (state, payload) => {
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
  },
  setUserLocation: (state, payload) => {
    state.location.lat = payload.lat;
    state.location.lng = payload.lng;
    state.location.error = payload.error;
  },
  // setUserLocation: (state, payload) => {
  //   state.user.location.lat = payload.lat;
  //   state.user.location.lng = payload.lng;
  //   // state.user.location.error = payload.error;
  // },
  setUserGames: (state, payload) => {
    state.userGames = payload;
  },
};

const actions = {
  setUserId: ({ commit }, payload) => {
    commit("setUserId", payload);
  },
  setUserName: ({ commit }, payload) => {
    commit("setUserName", payload);
  },
  setUserTheme: ({ commit }, payload) => {
    commit("setUserTheme", payload);
  },
  setUserDefaultTee: ({ commit }, payload) => {
    commit("setUserDefaultTee", payload);
  },
  setUserLocation: ({ commit }, payload) => {
    commit("setUserLocation", payload);
  },
  async fetchUser(context) {
    try {
      const response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUser, { id: state.user.id }),
      );
      context.commit("setUser", response.data.getUser);
    } catch (e) {
      console.log("fetchUserError", e);
    }
  },

  async fetchUserGameList(context) {
    console.log("User ID", state.user.id);
    try {
      const response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUserGameList, { id: state.user.id }),
      );
      context.commit("setUserGames", response.data.getUser);
    } catch (e) {
      console.log("fetchUserGameListError", e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
