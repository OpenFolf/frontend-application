import router from "@/router";

const state = {
  user: null,
  signedIn: false,
};

const getters = {
  user: (state) => {
    return state.user;
  },
  signedIn: (state) => {
    return state.signedIn;
  },
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  setSignedIn: (state, signedIn) => {
    state.signedIn = signedIn;
    router.push({ name: "home" });
  },
  setSignOut: (state) => {
    state.user = null;
    state.signedIn = false;
    sessionStorage.clear();
    router.push({ name: "auth" });
  },
};

const actions = {
  setUser: ({ commit }, user) => {
    commit("setUser", user);
  },
  setSignedIn: ({ commit }, signedIn) => {
    commit("setSignedIn", signedIn);
  },
  setSignOut: ({ commit }) => {
    commit("setSignOut");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
