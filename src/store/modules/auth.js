import { Auth } from "aws-amplify";
import { getUserLocation } from "@/services";

const initialState = () => ({
  userAuthObject: null,
  signedIn: false,
  errorMsg: {
    message: "",
  },
  authState: {
    path: "signIn",
    email: "",
  },
});

const state = initialState();

const getters = {
  signedIn: (state) => {
    console.log("Auth>Getters>signedIn");
    return state.signedIn;
  },
  errorMsg: (state) => {
    console.log("Auth>Getters>ErrorMsg");
    return state.errorMsg;
  },
  authState: (state) => {
    console.log("Auth>Getters>authState");
    return state.authState;
  },
};

const mutations = {
  SIGN_OUT: (state) => {
    console.log("Auth>mutations>SIGN_OUT");
    state.userAuthObject = null;
    state.signedIn = false;
    sessionStorage.clear();
  },
  ERROR_MSG: (state, errorMsg) => {
    console.log("Auth>mutations>ERROR_MSG");
    state.errorMsg = errorMsg;
  },
  CLEAR_ERRORS: (state) => {
    console.log("Auth>mutations>CLEAR_ERRORS");
    state.errorMsg = {
      errorMsg: {
        message: "",
      },
    };
  },
  SIGN_UP: (state, payload) => {
    console.log("Auth>mutations>SIGN_UP");
    state.authState.path = "signUp";
    if (payload.email) state.authState.email = payload.email;
  },
  SIGN_IN: (state, payload) => {
    console.log("Auth>mutations>SIGN_IN");
    // console.log("Auth>mutations>SIGN_IN, payload ", payload);
    state.authState.path = "signIn";
    if (payload.email) state.authState.email = payload.email;
  },
  CONFIRM_SIGN_UP: (state, payload) => {
    console.log("Auth>mutations>CONFIRM_SIGN_UP");
    state.authState.path = "confirmSignUp";
    if (payload.email) state.authState.email = payload.email;
  },
  RESET_PASSWORD: (state, payload) => {
    console.log("Auth>mutations>RESET_PASSWORD");
    state.authState.path = "resetPassword";
    if (payload.email) state.authState.email = payload.email;
  },
  AUTHENTICATED(state, user) {
    console.log("Auth>mutations>AUTHENTICATED");
    state.signedIn = !!user && user.attributes && user.attributes.email_verified;
    state.userAuthObject = user;
  },
  RESET_AUTH(state) {
    console.log("Auth>mutations>RESET_AUTH");
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

const actions = {
  async signIn({ commit, dispatch }, { email, password }) {
    // console.log("Auth>Actions>SignIn, email: ", email, "password", password);
    try {
      var callback = await Auth.signIn(email, password);
      console.log("Auth>Actions>SignIn>, callback from Auth.signIn ", callback);
      dispatch("fetchUserAuth");
    } catch (e) {
      if (e.code && e.code === "UserNotConfirmedException") {
        commit("CONFIRM_SIGN_UP", { email: email });
        return;
      }
      console.log("Auth>Actions>SignIn, catch", e);
      commit("ERROR_MSG", e);
    }
  },
  async fetchUserAuth({ commit, dispatch }) {
    console.log("Auth>Actions>fetchUser");
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("AUTHENTICATED", user);
      commit("setUserId", user.username);
      dispatch("initializeUser");
    } catch (e) {
      dispatch("resetAuth");
      //TODO: Check if this error has to be displayed
      console.log("Auth>Actions>fetchUser>Catch, error ", e);
    }
  },
  async initializeUser({ dispatch }) {
    await dispatch("fetchUser");

    getUserLocation();
    dispatch("fetchCourseList");
    dispatch("fetchUserGameList");
  },

  async signUp({ commit }, userObj) {
    console.log("Auth>Actions>signUp");
    try {
      const userAuthObj = await Auth.signUp(userObj);
      if (userAuthObj.userConfirmed === false) {
        commit("CONFIRM_SIGN_UP", { email: userObj.username });
        return;
      }
      commit("SIGN_IN", { email: userObj.email });
    } catch (e) {
      if (e.code && e.code === "UserNotConfirmedException") {
        commit("CONFIRM_SIGN_UP", { email: userObj.username });
        return;
      }
      commit("ERROR_MSG", e);
    }
  },
  async confirmSignUp({ commit }, { email, confirmCode }) {
    console.log("Auth>Actions>confirmSignUp");
    try {
      await Auth.confirmSignUp(email, confirmCode);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resendSignUp({ commit }, email) {
    console.log("Auth>Actions>resendSignUp");
    try {
      await Auth.resendSignUp(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resetPassword({ commit }, email) {
    console.log("Auth>Actions>resetPassword");
    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async forgotPasswordSubmit({ commit }, { email, code, password }) {
    console.log("Auth>Actions>forgotPasswordSubmit");
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async signOut({ commit }) {
    console.log("Auth>Actions>signOut");
    try {
      await Auth.signOut();
      commit("SIGN_OUT");
    } catch (e) {
      throw Error("Error in Auth>Actions>signOut", e);
    }
  },
  resetAuth({ commit }) {
    console.log("Auth>Actions>resetAuth");
    commit("RESET_AUTH");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
