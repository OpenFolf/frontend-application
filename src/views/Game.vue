<template>
  <fragment>
    <v-app-bar color="#41b883" app hide-on-scroll>
      <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
      <v-toolbar-title class="headline font-weight-bold">/</v-toolbar-title>
      <v-spacer />
      <v-btn-toggle v-model="sortAlpha">
        <v-btn depressed :value="true">
          <v-icon>fa-sort-alpha-down</v-icon>
        </v-btn>
        <v-btn depressed :value="false">
          <v-icon>fa-globe-europe</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row dense>
          <course-list-item v-for="course in courses" :key="course.id" :content="course" />
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { v4 } from "uuid/v4";
  import CourseListItem from "@/components/game/CourseListItem.vue";
  import { Fragment } from "vue-fragment";
  export default {
    name: "game",
    components: {
      CourseListItem,
      Fragment,
    },
    computed: {
      courses() {
        let sortedList = this.coursesList.map((x) => x);
        if (this.sortAlpha) {
          return sortedList.sort(function(a, b) {
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
          return sortedList.sort(function(a, b) {
            return a.distance - b.distance;
          });
        }
      },
    },
    data: () => ({
      sortAlpha: true,
      coursesList: [
        {
          name: "Fossvogur",
          path: "fossvogur",
          id: v4(),
          distance: 10,
          red: true,
          blue: true,
          yellow: false,
          white: true,
        },
        {
          name: "Klambratún",
          path: "klambratun",
          id: v4(),
          distance: 20,
          red: true,
          blue: false,
          yellow: true,
          white: true,
        },
        {
          name: "Laugardalur",
          path: "laugardalur",
          id: v4(),
          distance: 30,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Gufunes",
          path: "gufunes",
          id: v4(),
          distance: 440,
          red: false,
          blue: false,
          yellow: false,
          white: true,
        },
        {
          name: "Grafarvogur",
          path: "grafarvogur",
          id: v4(),
          distance: 50,
          red: false,
          blue: false,
          yellow: false,
          white: false,
        },
        {
          name: "Fjarkanistan",
          path: "fjarkanistan",
          id: v4(),
          distance: 60,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Hafnarfjörður",
          path: "hafnarfjordur",
          id: v4(),
          distance: 70,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Kópavogur",
          path: "kopavogur",
          id: v4(),
          distance: 99,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Selfoss",
          path: "selfoss",
          id: v4(),
          distance: 90,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Egilstaðir",
          path: "egilstadir",
          id: v4(),
          distance: 5100,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Breiðholt",
          path: "breidholt",
          id: v4(),
          distance: 105,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
        {
          name: "Kjalarnes",
          path: "kjalarnes",
          id: v4(),
          distance: 100,
          red: true,
          blue: true,
          yellow: true,
          white: true,
        },
      ],
    }),
  };
</script>
