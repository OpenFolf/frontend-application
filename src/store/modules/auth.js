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
    return state.signedIn;
  },
  errorMsg: (state) => {
    return state.errorMsg;
  },
  authState: (state) => {
    return state.authState;
  },
};

const mutations = {
  SIGN_OUT: (state) => {
    state.userAuthObject = null;
    state.signedIn = false;
    sessionStorage.clear();
  },
  ERROR_MSG: (state, errorMsg) => {
    state.errorMsg = errorMsg;
  },
  CLEAR_ERRORS: (state) => {
    state.errorMsg = {
      errorMsg: {
        message: "",
      },
    };
  },
  SIGN_UP: (state, payload) => {
    state.authState.path = "signUp";
    if (payload.email) state.authState.email = payload.email;
  },
  SIGN_IN: (state, payload) => {
    state.authState.path = "signIn";
    if (payload.email) state.authState.email = payload.email;
  },
  CONFIRM_SIGN_UP: (state, payload) => {
    state.authState.path = "confirmSignUp";
    if (payload.email) state.authState.email = payload.email;
  },
  RESET_PASSWORD: (state, payload) => {
    state.authState.path = "resetPassword";
    if (payload.email) state.authState.email = payload.email;
  },
  AUTHENTICATED(state, user) {
    state.signedIn = !!user && user.attributes && user.attributes.email_verified;
    state.userAuthObject = user;
  },
  RESET_AUTH(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
};

const actions = {
  async signIn({ commit, dispatch }, { email, password }) {
    // Sign user into Cognito
    try {
      await Auth.signIn(email, password);
      // After sign in fetch user info to store in state
      dispatch("fetchUserAuth");
    } catch (e) {
      // Display correct error message
      if (e.code && e.code === "UserNotConfirmedException") {
        commit("CONFIRM_SIGN_UP", { email: email });
        return;
      }
      commit("ERROR_MSG", e);
    }
  },
  async fetchUserAuth({ commit, dispatch }) {
    // Fetch user auth object from Cognito
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit("AUTHENTICATED", user);
      commit("setUserId", user.username);
      dispatch("initializeUser");
    } catch (e) {
      dispatch("resetAuth");
    }
  },
  async initializeUser({ dispatch }) {
    // Get user information
    await dispatch("fetchUser");
    // Get user location
    getUserLocation();
  },

  async signUp({ commit }, userObj) {
    // Register new user in Cognito
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
    // Confirm new user sign up in Cognito
    try {
      await Auth.confirmSignUp(email, confirmCode);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resendSignUp({ commit }, email) {
    // Resend sign up
    try {
      await Auth.resendSignUp(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resetPassword({ commit }, email) {
    // Reset password in Cognito
    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async forgotPasswordSubmit({ commit }, { email, code, password }) {
    // Forgot password process in Cognito
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async signOut({ commit }) {
    // Sign out user from Cognito
    try {
      await Auth.signOut();
      commit("SIGN_OUT");
    } catch (e) {
      throw Error("Error in Auth>Actions>signOut", e);
    }
  },
  resetAuth({ commit }) {
    // Reset auth object in state
    commit("RESET_AUTH");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
