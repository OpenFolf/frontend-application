import router from "@/router";
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
    //console.log("Auth>Getters>signedIn");
    return state.signedIn;
  },
  errorMsg: (state) => {
    //console.log("Auth>Getters>ErrorMsg");
    return state.errorMsg;
  },
  authState: (state) => {
    //console.log("Auth>Getters>authState");
    return state.authState;
  },
};

const mutations = {
  SIGN_OUT: (state) => {
    //console.log("Auth>mutations>SIGN_OUT");
    state.userAuthObject = null;
    state.signedIn = false;
    sessionStorage.clear();
    router.push({ name: "auth" });
  },
  ERROR_MSG: (state, errorMsg) => {
    //console.log("Auth>mutations>ERROR_MSG");
    state.errorMsg = errorMsg;
  },
  CLEAR_ERRORS: (state) => {
    //console.log("Auth>mutations>CLEAR_ERRORS");
    state.errorMsg = {
      errorMsg: {
        message: "",
      },
    };
  },
  SIGN_UP: (state, payload) => {
    //console.log("Auth>mutations>SIGN_UP");
    state.authState.path = "signUp";
    if (payload.email) state.authState.email = payload.email;
  },
  SIGN_IN: (state, payload) => {
    //console.log("Auth>mutations>SIGN_IN");
    state.authState.path = "signIn";
    if (payload.email) state.authState.email = payload.email;
  },
  CONFIRM_SIGN_UP: (state, payload) => {
    //console.log("payload", payload);
    //console.log("payload", payload.email);
    state.authState.path = "confirmSignUp";
    if (payload.email) state.authState.email = payload.email;
  },
  RESET_PASSWORD: (state, payload) => {
    //console.log("payload", payload);
    //console.log("payload", payload.email);
    state.authState.path = "resetPassword";
    if (payload.email) state.authState.email = payload.email;
  },
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  AUTHENTICATED(state, user) {
    //console.log("payload", payload);
    state.signedIn = !!user && user.attributes && user.attributes.email_verified;
    state.userAuthObject = user;
    router.push({ name: "home-menu" });
  },
};

const actions = {
  reset({ commit }) {
    //console.log("Auth>Actions>reset");
    commit("RESET");
  },
  async signIn({ commit, dispatch }, { email, password }) {
    //console.log("Auth>Actions>SignIn", email, password);
    try {
      await Auth.signIn(email, password);
    } catch (e) {
      if (e.code && e.code === "UserNotConfirmedException") {
        commit("CONFIRM_SIGN_UP", { email: email });
        return;
      }
      commit("ERROR_MSG", e);
    }
    dispatch("fetchUserAuth");
  },
  async fetchUserAuth({ commit, dispatch }) {
    //console.log("Auth>Actions>fetchUser");
    try {
      const user = await Auth.currentAuthenticatedUser();
      // const expires =
      //   user.getSignInUserSession().getIdToken().payload.exp -
      //   Math.floor(new Date().getTime() / 1000);
      //console.log(`Token expires in ${expires} seconds`);
      // Don't know if we need this if we have app sync
      // setTimeout(async () => {
      //   //console.log("Renewing Token");
      //   await dispatch("fetchUser");
      // }, expires * 1000);
      commit("AUTHENTICATED", user);
      // Set the User id in the UserStore
      commit("setUserId", user.username);
      commit("fetchUser");
      //TODO: Remove, find better place
      // check if set await
      getUserLocation();
      dispatch("fetchCourseList");
    } catch (e) {
      //What was supposed to happen? Use commit("RESET") instead?
      /// Set initialize
      commit("user", null);
      //TODO: Check if this error has to be displayed
      //console.log("Auth>Actions>fetchUser>Catch, error ", e);
    }
  },

  async signUp({ commit }, userObj) {
    //console.log("Auth>Actions>signUp");
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
    //console.log("Auth>Actions>confirmSignUp");
    try {
      await Auth.confirmSignUp(email, confirmCode);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resendSignUp({ commit }, email) {
    //console.log("Auth>Actions>resendSignUp");
    try {
      await Auth.resendSignUp(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async resetPassword({ commit }, email) {
    //console.log("Auth>Actions>resetPassword");
    try {
      await Auth.forgotPassword(email);
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async forgotPasswordSubmit({ commit }, { email, code, password }) {
    //console.log("Auth>Actions>forgotPasswordSubmit");
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      commit("SIGN_IN", { email: email });
    } catch (e) {
      commit("ERROR_MSG", e);
    }
  },
  async signOut({ commit }) {
    //console.log("Auth>Actions>signOut");
    try {
      await Auth.signOut();
      commit("SIGN_OUT");
    } catch (e) {
      throw new Error("Error in Auth>Actions>signOut", e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
