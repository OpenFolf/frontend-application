import { API, graphqlOperation } from "aws-amplify";
import * as usergraphQL from "../../graphql/custom/usergraphQL";
import vuetify from "../../plugins/vuetify";
// import vuetify from "@/plugins/vuetify";

const initialState = () => ({
  user: {
    id: "",
  },
  location: {
    lat: 64.128197,
    lng: -21.885087,
    error: 0,
  },
  userGames: [],
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
    console.log("DefTee", payload);
    //Add to database
  },
  setUserLocation: (state, payload) => {
    state.location.lat = payload.lat;
    state.location.lng = payload.lng;
    state.location.error = payload.error;
  },
  setUserGames: (state, payload) => {
    state.userGames = payload;
  },
  RESET_USER(state) {
    //console.log("Auth>mutations>RESET_USER");
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

const actions = {
  setUserId: ({ commit }, payload) => {
    console.log("User>setUserId");
    commit("setUserId", payload);
  },

  async setUserName(context, payload) {
    // Add to database
    const userId = context.rootState.user.user.id;
    try {
      await API.graphql(
        graphqlOperation(usergraphQL.updateUser, {
          input: { id: userId, username: payload },
        }),
      );
    } catch (e) {
      throw Error("Update username error: ", e);
    }
    context.commit("setUserName", payload);
  },

  async setUserTheme(context) {
    const userId = context.rootState.user.user.id;
    const userTheme = context.state.user.defMode;
    if (userTheme == "DARK") {
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
      console.log("Vuetify object: ", vuetify);
      vuetify.framework.theme.isDark = false;
    } else {
      try {
        await API.graphql(
          graphqlOperation(usergraphQL.updateUser, {
            input: { id: userId, defMode: "DARK" },
          }),
        );
      } catch (e) {
        throw Error("Update to DARK defMode error: ", e);
      }
      console.log("Vuetify object: ", vuetify);
      context.commit("setUserTheme", "DARK");
      vuetify.framework.theme.isDark = true;
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
    console.log("User>fetchUser");
    try {
      const response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUser, { id: state.user.id }),
      );
      context.commit("setUser", response.data.getUser);
    } catch (e) {
      throw Error("fetchUserError", e);
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
      throw Error("fetchUserGameListError", e);
    }
  },

  resetUser({ commit }) {
    console.log("Auth>Actions>resetUser");
    commit("RESET_USER");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
