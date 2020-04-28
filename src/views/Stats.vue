<template>
  <fragment>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title class="headline font-weight-bold" flat>Stats</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <user-stats-list />
    </v-content>
  </fragment>
</template>

<script>
  import { mapActions } from "vuex";
  import { Fragment } from "vue-fragment";
  import UserStatsList from "../components/stats/UserStatsList";
  export default {
    name: "stats",
    components: {
      UserStatsList,
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
