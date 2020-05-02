<template>
  <fragment>
    <v-app-bar color="primary" dark app flat>
      <v-toolbar-title class="display-1 font-weight-bold">Stats</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid class="mt-0 pt-0">
        <v-row>
          <user-stats-list v-if="getUserGames[0].gameId" />
          <v-col cols="12" v-else>
            <v-card flat>
              <v-card-title> No statistics yet. Start playing! </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { getUserLocation } from "../services";
  import { Fragment } from "vue-fragment";
  import UserStatsList from "../components/stats/UserStatsList.vue";
  export default {
    name: "stats",
    components: {
      UserStatsList,
      Fragment,
    },
    computed: {
      ...mapGetters(["getUserGames"]),
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
      getUserLocation();
    },
  };
</script>
