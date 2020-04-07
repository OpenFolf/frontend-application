// import { API, graphqlOperation } from "aws-amplify";
// import * as queries from "../../graphql/queries";
// import * as graphQLmutations from "../../graphql/mutations";
// import * as subscriptions from "../../graphql/subscriptions";

const state = {
  game: {
    id: "",
    course: {
      id: "",
      name: "",
    },
    owner: "",
    players: [],
    gameStatus: "",
  },
};

const getters = {
  getGame: (state) => {
    return state.game;
  },
  getGameId: (state) => {
    return state.game.id;
  },
  getCourse: (state) => {
    return state.game.course;
  },
  getCourseId: (state) => {
    return state.game.course.id;
  },
  getCourseName: (state) => {
    return state.game.course.name;
  },
  getGameOwner: (state) => {
    return state.game.owner;
  },
  getGameStatus: (state) => {
    return state.game.gameStatus;
  },
};

const mutations = {
  setGame: (state, payload) => {
    state.game = payload;
  },
  setGameId: (state, payload) => {
    state.game.id = payload;
  },
  setCourse: (state, payload) => {
    state.game.course = payload;
  },
  setCourseId: (state, payload) => {
    state.game.course.id = payload;
  },
  setCourseName: (state, payload) => {
    state.game.course.name = payload;
  },
  setGameOwner: (state, payload) => {
    state.game.owner = payload;
  },
  setGameStatus: (state, payload) => {
    state.game.gameStatus = payload;
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
