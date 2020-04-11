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
  getUsername: (state) => {
    return state.user.username;
  },
  getEmail: (state) => {
    return state.user.email;
  },
  getCurrentGame: (state) => {
    return state.user.currentGame;
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
};

const actions = {
  setUserId: ({ commit }, payload) => {
    commit("setUserId", payload);
  },
  async fetchUser(context) {
    const response = await API.graphql(
      graphqlOperation(usergraphQL.getUser, { id: state.user.id }),
    );

    context.commit("setUser", response.data.getUser);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
