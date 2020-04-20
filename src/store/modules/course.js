import { API, graphqlOperation } from "aws-amplify";
import * as coursegraphQL from "../../graphql/custom/coursegraphQL";
import * as graphQLmutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import { getDistanceKM } from "@/services";

const state = {
  courses: [],
  currentCourse: null,
};

const getters = {
  getCourses: (state) => {
    return state.courses;
  },
  getCurrentCourse: (state) => {
    return state.currentCourse;
  },
  getCoursesDistance: (context, state) => {
    if (state.courses.length > 0) {
      console.log("Course state:", state.courses);
      const listWithDistance = state.courses.map((x) => {
        x.distance = getDistanceKM(
          parseFloat(64.128197), // lat, should come from store.
          parseFloat(-21.885087), // lng, should come from store.
          parseFloat(x.latitude),
          parseFloat(x.longitude),
        ).toFixed(1);
      });
      // const listWithDistance = JSON.parse(JSON.stringify(state.courses));
      // const listWithDistance = [...state.courses];
      // for (let item of listWithDistance) {
      //   item.distance = getDistanceKM(
      //     parseFloat(64.128197), // lat, should come from store.
      //     parseFloat(-21.885087), // lng, should come from store.
      //     parseFloat(item.latitude),
      //     parseFloat(item.longitude),
      //   ).toFixed(1);
      // }
      return listWithDistance;
    } else {
      return state.courses;
    }
  },
};

const mutations = {
  updateCourseList: (state, payload) => {
    state.courses = payload;
  },
  updateCurrentCourse: (state, payload) => {
    // console.log("payload", payload);
    if (payload.holes.items.length > 0) {
      payload.holes.items.sort((a, b) => a.no - b.no);
    }
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
      // console.log("fetchCourseList", courseList);

      context.commit("updateCourseList", courseList);
      //console.log("fetchCourseList", response);
    } catch (e) {
      console.log("Error", e);
    }
  },

  async fetchCourse(context, payload) {
    try {
      const response = await API.graphql(
        graphqlOperation(coursegraphQL.getCourse, { id: payload }),
      );
      const course = response.data.getCourse;

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
