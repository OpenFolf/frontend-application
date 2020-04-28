<template>
  <fragment>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="headline font-weight-bold" flat>Stats</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-row>
        <user-stats-list-item />
      </v-row>
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
