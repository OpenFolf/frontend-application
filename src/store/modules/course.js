import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as graphQLmutations from "../../graphql/mutations";
import * as subscriptions from "../../graphql/subscriptions";

const state = {
  courses: [],
};

const getters = {
  getCourses: (state) => {
    return state.courses;
  },
};

const mutations = {
  updateCourseList: (state, payload) => {
    state.courses = payload;
  },
  newCourse: (state, payload) => {
    state.courses.unshift(payload);
  },
};

const actions = {
  async getCourseList(context) {
    const response = await API.graphql(graphqlOperation(queries.listCourses));
    const courseList = response.data.listCourses.items;

    context.commit("updateCourseList", courseList);
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
