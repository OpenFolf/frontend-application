<template>
  <fragment>
    <v-app-bar color="primary" dark app hide-on-scroll flat>
      <v-toolbar-title class="display-1 font-weight-bold">Select Course</v-toolbar-title>
      <v-spacer />
      <v-btn @click="sortAlpha = !sortAlpha" color="#7CAA98" depressed>
        <v-icon>{{ sortAlpha ? "fa-globe-europe" : "fa-sort-alpha-down" }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row dense v-if="courses">
          <course-list-item v-for="course in courses" :key="course.id" :content="course" />
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import CourseListItem from "../components/game/CourseListItem.vue";
  import { Fragment } from "vue-fragment";
  export default {
    data() {
      return {
        courseId: "",
        sortAlpha: false,
      };
    },
    name: "game",
    components: {
      CourseListItem,
      Fragment,
    },
    created() {
      this.bottomNavHandler(true);
      this.resetCourse();
    },
    methods: {
      ...mapActions(["showBottomNav", "resetCourse"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
    computed: {
      ...mapGetters(["getCourses"]),
      courses() {
        const courseList = this.getCourses.map((x) => x);
        if (this.sortAlpha) {
          return courseList.sort(function(a, b) {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        } else {
          return courseList.sort(function(a, b) {
            return a.distance - b.distance;
          });
        }
      },
    },
  };
</script>
