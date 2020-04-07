import router from "@/router";

const state = {
  userAuthObject: null,
  signedIn: false,
};

const getters = {
  getUserAuthObject: (state) => {
    return state.userAuthId;
  },
  getSignedIn: (state) => {
    return state.signedIn;
  },
};

const mutations = {
  setUserAuthObject: (state, user) => {
    state.userAuthId = user;
  },
  setSignedIn: (state, signedIn) => {
    state.signedIn = signedIn;
    router.push({ name: "home" });
  },
  setSignOut: (state) => {
    state.userAuthObject = null;
    state.signedIn = false;
    sessionStorage.clear();
    router.push({ name: "auth" });
  },
};

const actions = {
  setUserAuthObject: ({ commit }, user) => {
    commit("setUserAuthObject", user);
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
