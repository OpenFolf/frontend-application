<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card color="accent" class="pa-1 overflow-x-auto">
            <v-card-title>User games</v-card-title>
            <v-btn x-large block color="error" @click="lobbyHandler">
              <v-icon>Fetch lobby game</v-icon>
            </v-btn>
            <!-- <pre> {{ userGames }} </pre> -->
            <pre> {{ game }} </pre>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "stats",
    computed: {
      ...mapGetters(["getUserGames", "getGamesList"]),
      userGames() {
        return this.getUserGames;
      },
      game() {
        return this.getGamesList;
      },
    },

    methods: {
      ...mapActions(["fetchUserGameList", "fetchLobbyGame"]),
      lobbyHandler() {
        this.fetchLobbyGame();
      },
    },
    data() {
      return {
        courseId: "",
        pushed: false,
        gameId: "",
        createGameCourseId: "",
        playerGameId: "",
        playerSubscribeId: "",
      };
    },
    created() {
      this.fetchUserGameList();
    },
  };
</script>
