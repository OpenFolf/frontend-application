import { API, graphqlOperation } from "aws-amplify";
import * as usergraphQL from "../../graphql/custom/usergraphQL";
// import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  user: {
    id: "",
  },
};

const getters = {
  getUser: (state) => {
    return state.user;
  },
  getUserId: (state) => {
    return state.user.id;
  },
  // Changed "getUsername" -> "getUserName" AEXX @ aegir-ui 13.04
  getUserName: (state) => {
    return state.user.username;
  },
  getEmail: (state) => {
    return state.user.email;
  },
  getCurrentGame: (state) => {
    return state.user.currentGame;
  },
  // Added AEXX @ aegir-ui 13.04
  getUserTee: (state) => {
    return state.user.defTee;
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
  // Added AEXX @ aegir-ui 13.04
  setUserTheme: (state, payload) => {
    state.user.defMode = payload;
  },
  // Added AEXX @ aegir-ui 13.04
  setUserDefaultTee: (state, payload) => {
    state.user.defTee = payload;
  },
};

const actions = {
  setUserId: ({ commit }, payload) => {
    commit("setUserId", payload);
  },
  setUserName: ({ commit }, payload) => {
    commit("setUserName", payload);
  },
  // Added AEXX @ aegir-ui 13.04
  setUserTheme: ({ commit }, payload) => {
    commit("setUserTheme", payload);
  },
  // Added AEXX @ aegir-ui 13.04
  setUserDefaultTee: ({ commit }, payload) => {
    commit("setUserDefaultTee", payload);
  },
  async fetchUser(context) {
    try {
      const response = await API.graphql(
        graphqlOperation(usergraphQL.fetchUser, { id: state.user.id }),
      );
      context.commit("setUser", response.data.getUser);
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
