import { API, graphqlOperation } from "aws-amplify";
import * as coursegraphQL from "../../graphql/custom/coursegraphQL";
import * as graphQLmutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";
import { getDistanceKM } from "@/services";

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
  getCoursesDistance: (state) => {
    // Bring in an actual user location. This is RU.
    const userLocation = {
      lat: 64.123782,
      lng: -21.925765,
    };
    const listWithDistance = JSON.parse(JSON.stringify(state.courses));
    for (let item of listWithDistance) {
      item.distance = getDistanceKM(
        userLocation.lat,
        userLocation.lng,
        item.latitude,
        item.longitude,
      ).toFixed(1);
    }
    return listWithDistance;
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

      context.commit("updateCourseList", courseList);
      //console.log("response", response);
    } catch (e) {
      throw new TypeError("Error", e);
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
      throw new TypeError("Error", e);
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
