<template>
  <fragment>
    <v-app-bar color="primary" app hide-on-scroll>
      <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
      <v-toolbar-title class="headline font-weight-bold" flat>/</v-toolbar-title>
      <v-spacer />
      <v-btn-toggle v-model="sortAlpha">
        <v-btn depressed :value="false">
          <v-icon>fa-sort-alpha-down</v-icon>
        </v-btn>
        <v-btn depressed :value="true">
          <v-icon>fa-globe-europe</v-icon>
        </v-btn>
      </v-btn-toggle>
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
  import { mapGetters } from "vuex";
  import CourseListItem from "@/components/game/CourseListItem.vue";
  import { Fragment } from "vue-fragment";
  export default {
    data() {
      return {
        courseId: "",
        // pushed: false,
        sortAlpha: false,
      };
    },
    name: "game",
    components: {
      CourseListItem,
      Fragment,
    },
    computed: {
      ...mapGetters(["getCoursesDistance"]),
      courses() {
        const courseList = this.getCoursesDistance.map((x) => x);
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
