<template>
  <fragment>
    <v-app-bar color="primary" dark app flat>
      <v-toolbar-title class="display-1 font-weight-bold">Stats</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <!-- <stats-list-item
            v-for="userGame in getUserGames"
            :key="userGame.id"
            :userGame="userGame"
          /> -->
            <user-stats-list-item />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { Fragment } from "vue-fragment";
  import UserStatsListItem from "../components/stats/UserStatsListItem.vue";
  // import StatsListItem from "../components/stats/StatsListItem.vue";
  export default {
    name: "stats",
    computed: {
      ...mapGetters(["getUserGames"]),
    },
    components: {
      UserStatsListItem,
      // StatsListItem,
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
