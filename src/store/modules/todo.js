import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import * as graphQLmutations from "../../graphql/mutations";

const state = {
  todos: [],
};

const getters = {
  getTodos: (state) => {
    return state.todos;
  },
};

const mutations = {
  updateTodos: (state, payload) => {
    state.todos = payload;
  },
  newTodo: (state, payload) => {
    state.todos.unshift(payload);
  },
};

const actions = {
  async getTodosList(context) {
    const payload = await API.graphql(graphqlOperation(queries.listTodos));
    context.commit("updateTodos", payload);
  },
  async addTodo(context, payload) {
    const todoDetails = {
      name: payload,
      description: "Eitthvad bull",
    };

    const newTodo = await API.graphql(
      graphqlOperation(graphQLmutations.createTodo, { input: todoDetails }),
    );

    context.commit("newTodo", newTodo.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

// Query test
// query getTodos {
//     getTodo (id: "c7efc4b0-4ef3-4489-bcf3-199b95d569d6") {
//       id
//       name
//     }
//   }
  
//   mutation addTodo {
//     createTodo (input: {
//       name: "Test-1"
//     }) {
//           id
//       name
//     }
//   }
  
  
//   mutation addField {
//     createCourse (input: {
//           name: "Test"
//           courselength: 0
//           yearestablished: 0
//           parinfo: 0
//           teetype: "n/a"
//           baskettype: "n/a"
//           description: "n/a"
//           streetaddress: "n/a"
//           postalcode: "n/a"
//           location: "n/a"
//     }) {
//       id
//       name
//     }
//   }
  
//   query getAllCourses {
//     listCourses {
//       items {
//         id
//         name
//               courselength
//               yearestablished
//               parinfo
//               teetype
//               baskettype
//               description
//               streetaddress
//               postalcode
//               location
//       }
//     }
//   }