<template>
  <v-container class="pa-0" fluid>
    <v-content>
      <v-card color="#41b883">
        <v-card-title class="text-center justify-center pa-0 pb-6 d-flex flex-column">
          <v-container width="100%" class="d-flex flex-row ma-0 pa-1 pl-4 align-center">
            <router-link :to="{ name: 'game' }">
              <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
            </router-link>
            <v-toolbar-title class="headline font-weight-bold">{{ "/ " + path }}</v-toolbar-title>
          </v-container>
          <h1 class="font-weight-bold display-1 white--text pt-6">{{ course.name }}</h1>
          <v-btn large color="white" outlined class="mt-6">Play Course</v-btn>
        </v-card-title>

        <v-tabs v-model="currentTab" background-color="transparent" color="white" grow>
          <v-tab v-for="tab in tabs" :key="tab" class="white--text">
            {{ tab }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="currentTab" touchless>
          <v-tab-item><course-info /></v-tab-item>
          <v-tab-item><course-baskets /></v-tab-item>
          <v-tab-item><course-map /></v-tab-item>
          <!-- <v-tab-item><course-stats /></v-tab-item> -->
        </v-tabs-items>
      </v-card>
    </v-content>
  </v-container>
</template>

<script>
  import CourseInfo from "@/components/game/CourseInfo.vue";
  import CourseBaskets from "@/components/game/CourseBaskets.vue";
  import CourseMap from "@/components/game/CourseMap.vue";
  // import CourseStats from "@/components/game/CourseStats.vue";
  export default {
    name: "game-course",
    components: {
      CourseInfo,
      CourseBaskets,
      CourseMap,
      // CourseStats,
    },
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    methods: {
      swipe(direction) {
        this.dir = direction;
      },
    },
    data() {
      return {
        currentTab: null,
        tabs: ["Info", "Baskets", "Map" /*, "Stats"*/],
        course: {
          id: 1,
          name: "Fossvogur",
          info: {
            text:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          baskets: ["One", "Two", "Three", "Four", "Five"],
          map: {
            lon: 12,
            lat: 12,
          },
          stats: {
            data: "value",
          },
        },
      };
    },
  };
</script>
