<template>
  <fragment>
    <v-app-bar color="primary" dark app flat>
      <v-toolbar-title class="display-1 font-weight-bold">Stats</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid class="mt-0 pt-0">
        <v-row>
          <v-col cols="12">
            <user-stats-list-item />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { mapActions } from "vuex";
  import { Fragment } from "vue-fragment";
  import UserStatsListItem from "../components/stats/UserStatsListItem.vue";
  export default {
    name: "stats",
    components: {
      UserStatsListItem,
      Fragment,
    },
    methods: {
      ...mapActions(["fetchUserGameList", "showBottomNav", "resetGame", "resetCourse"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
    created() {
      this.fetchUserGameList();
      this.bottomNavHandler(true);
      this.resetGame();
      this.resetCourse();
    },
  };
</script>
