import { API, graphqlOperation } from "aws-amplify";
import * as coursegraphQL from "../../graphql/custom/coursegraphQL";
import { getDistanceKM } from "@/services";

const initialState = () => ({
  courses: null,
  currentCourse: null,
});

const state = initialState();
// BREAK: Getters
const getters = {
  getCourses: (state) => {
    return state.courses;
  },
  getCurrentCourse: (state) => {
    return state.currentCourse;
  },
};
// BREAK: Mutations
const mutations = {
  SET_COURSE_LIST: (state, payload) => {
    // Add distance property for list render/filter.
    state.courses = payload;
  },
  SET_CURRENT_COURSE: (state, payload) => {
    if (payload.holes.items.length > 0) {
      payload.holes.items.sort((a, b) => a.no - b.no);
    }
    state.currentCourse = payload;
  },
  RESET_COURSE(state) {
    state.currentCourse = "";
  },
};
// BREAK: ACTIONS
const actions = {
  async fetchCourseList(context) {
    // Get list of all courses from database
    try {
      const response = await API.graphql(graphqlOperation(coursegraphQL.getCourses));
      const courseList = response.data.listCourses.items;

      for (let course of courseList) {
        course.distance = getDistanceKM(
          parseFloat(context.rootState.user.location.lat),
          parseFloat(context.rootState.user.location.lng),
          parseFloat(course.latitude),
          parseFloat(course.longitude),
        ).toFixed(1);
      }
      // Add course list to state
      context.commit("SET_COURSE_LIST", courseList);
    } catch (e) {
      throw Error("Error, unable to fetch course list", e);
    }
  },
  async fetchCourse(context, payload) {
    // Fetch single course that matches payload from database
    try {
      const response = await API.graphql(
        graphqlOperation(coursegraphQL.getCourse, { id: payload }),
      );
      const course = response.data.getCourse;
      // Store course in state as current course
      context.commit("SET_CURRENT_COURSE", course);
    } catch (e) {
      throw Error("Error, unable to fetch course", e);
    }
  },
  resetCourse({ commit }) {
    commit("RESET_COURSE");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
