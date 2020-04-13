import { API, graphqlOperation } from "aws-amplify";
import * as coursegraphQL from "../../graphql/custom/coursegraphQL";
import * as graphQLmutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

const state = {
  courses: null,
  currentCourse: null,
};

const getters = {
  getCourses: (state) => {
    return state.courses;
  },
  getCurrentCourse: (state) => {
    return state.currentCourse;
  },
};

const mutations = {
  updateCourseList: (state, payload) => {
    state.courses = payload;
  },
  updateCurrentCourse: (state, payload) => {
    state.currentCourse = payload;
  },
  newCourse: (state, payload) => {
    state.courses.unshift(payload);
  },
};

const actions = {
  async fetchCourseList(context) {
    try {
      const response = await API.graphql(graphqlOperation(coursegraphQL.getCourses));
      const courseList = response.data.listCourses.items;

      context.commit("updateCourseList", courseList);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async fetchCourse(context, payload) {
    try {
      const response = await API.graphql(
        graphqlOperation(coursegraphQL.getCourse, { id: payload }),
      );
      const course = response.data;

      context.commit("updateCurrentCourse", course);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async addCourse(context, payload) {
    const courseDetails = {
      name: payload,
    };

    const newCourse = await API.graphql(
      graphqlOperation(graphQLmutations.createCourse, { input: courseDetails }),
    );

    context.commit("newCourse", newCourse.data);
  },

  async subscribeCourses(context) {
    const courses = API.graphql(graphqlOperation(subscriptions.onCreateCourse)).subscribe({
      next: (coursesData) => context.commit("updateCourseList", coursesData.value.data),
    });

    console.log(courses);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
