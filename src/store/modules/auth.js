import router from "@/router";
import { Auth } from "aws-amplify";
import { getUserLocation } from "@/services";

const state = {
  userAuthObject: null,
  signedIn: false,
  isLoading: false,
  errorMsg: {
    message: "",
  },
  authState: "signIn",
};

const getters = {
  getUserAuthObject: (state) => {
    console.log("Auth>Getters>getUserAuthObject");
    return state.userAuthId;
  },
  getSignedIn: (state) => {
    console.log("Auth>Getters>getSignedIn");
    return state.signedIn;
  },
  errorMsg: (state) => {
    console.log("Auth>Getters>ErrorMsg");
    return state.errorMsg;
  },
  authState: (state) => {
    console.log("Auth>Getters>ErrorMsg");
    return state.authState;
  },
};

const mutations = {
  setUserAuthObject: (state, user) => {
    console.log("Auth>mutations>setUserAuthObject");
    state.userAuthId = user;
  },
  SIGN_IN: (state, signedIn) => {
    console.log("Auth>mutations>SIGN_IN");
    state.signedIn = signedIn;
    //TODO: REMOVE, Should be handled elsewhere
    router.push({ name: "home-menu" });
  },
  SIGN_OUT: (state) => {
    console.log("Auth>mutations>SIGN_OUT");
    state.userAuthObject = null;
    state.signedIn = false;
    sessionStorage.clear();
    router.push({ name: "auth" });
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
  SIGN_UP: (state) => {
    state.authState = "signUp";
  },
  LOG_IN: (state) => {
    state.authState = "signIn";
  },
  FORGOT_PASSWORD: (state) => {
    state.authState = "forgotPassword";
  },
  CONFIRM_SIGN_UP: (state) => {
    state.authState = "confirmSignUp";
  },
};

const actions = {
  // setUserAuthObject: ({ commit }, user) => {
  //   console.log("Auth>Actions>setUserAuthObject");
  //   commit("setUserAuthObject", user);
  // },
  // setSignedIn: ({ commit }, signedIn) => {
  //   console.log("Auth>Actions>setSignedIn");
  //   commit("setSignedIn", signedIn);
  // },
  setSignOut: ({ commit }) => {
    console.log("Auth>Actions>setSignOut");
    commit("SIGN_OUT");
  },
  // BREAK:
  async signInAction({ commit, dispatch }, { email, password }) {
    console.log("Auth>Actions>SignIn");
    try {
      await Auth.signIn(email, password);
      commit("SIGN_IN", true);
    } catch (e) {
      if (e.code && e.code === "UserNotConfirmedException") {
        commit("CONFIRM_SIGN_UP");
      } else {
        commit("ERROR_MSG", e);
      }
    }
    dispatch("fetchUser");
  },

  async fetchUser({ commit, dispatch }) {
    console.log("Auth>Actions>fetchUser");
    try {
      const userAuthObj = await Auth.currentAuthenticatedUser();
      const expires =
        userAuthObj.getSignInUserSession().getIdToken().payload.exp -
        Math.floor(new Date().getTime() / 1000);
      console.log(`Token expires in ${expires} seconds`);
      // Don't know if we need this if we have app sync
      setTimeout(async () => {
        console.log("Renewing Token");
        await dispatch("fetchUser");
      }, expires * 1000);

      commit("setUserAuthObject", userAuthObj);
      // Do we need this, hasn't the UserId been set in "setUserAutObject"
      commit("setUserId", userAuthObj.username);

      //TODO: Remove, find better place
      getUserLocation();
      dispatch("fetchCourseList");
      //
    } catch (e) {
      commit("user", null);
      this.setError(e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
