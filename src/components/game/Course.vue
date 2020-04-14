<template>
  <v-content>
    <v-card class="ma-0 pa-0" color="transparent" tile flat>
      <v-toolbar color="primary" flat>
        <v-container class="ma-0 pa-0 d-flex flex-row justify-start align-center full-width">
          <router-link :to="{ name: 'game' }">
            <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
          </router-link>
          <v-toolbar-title class="headline font-weight-bold">{{ "/ " + path }}</v-toolbar-title>
        </v-container>
      </v-toolbar>
      <v-card class="ma-0 pa-0 d-flex justify-center" color="secondary" tile flat>
        <v-btn
          large
          color="white"
          outlined
          class="my-6"
          :to="{ name: 'game-lobby', params: { path: path } }"
          >Play Course</v-btn
        >
      </v-card>
      <v-tabs v-model="currentTab" background-color="secondary" color="white" grow>
        <v-tab v-for="tab in tabs" :key="tab" class="white--text">
          {{ tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab" touchless>
        <v-tab-item><course-info :course="getCurrentCourse"/></v-tab-item>
        <v-tab-item><course-baskets /></v-tab-item>
        <v-tab-item>
          <course-map :lat="getCurrentCourse.latitude" :lng="getCurrentCourse.longitude"
        /></v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-content>
</template>

<script>
  import CourseInfo from "@/components/game/CourseInfo.vue";
  import CourseBaskets from "@/components/game/CourseBaskets.vue";
  import CourseMap from "@/components/game/CourseMap.vue";
  // import CourseStats from "@/components/game/CourseStats.vue";
  import { mapGetters } from "vuex";
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
      };
    },
    computed: {
      ...mapGetters(["getCurrentCourse"]),
    },
  };
</script>
