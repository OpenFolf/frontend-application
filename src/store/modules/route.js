// import { API, graphqlOperation } from "aws-amplify";
// import * as usergraphQL from "../../graphql/custom/usergraphQL";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  defaultRouting(context) {
    console.log(context);
    // If not signedIn then route to sign in page
    // If gameStatus " "
    // If gameStatus "0" route user to lobby
    // If gameStatus "1" then route user to scorecard
    // If gameStatus "2" then open finish game modal, then route user to stats, then re-initialize game object in state
    // If gameStatus "-1" then route to home, then re-initialize game object in state
  },

  inGameRouting(context) {
    console.log(context);
    // If not signedIn then route to sign in page
    // If gameStatus " "
    // If gameStatus "0" route user to lobby
    // If gameStatus "1" then route user to scorecard
    // If gameStatus "2" then open finish game modal, then route user to stats, then re-initialize game object in state
    // If gameStatus "-1" then route to home, then re-initialize game object in state
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
