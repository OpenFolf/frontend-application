<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card color="accent" class="pa-1 overflow-x-auto">
            <v-card-title>User games</v-card-title>
            <pre> {{ userGames }} </pre>
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
      ...mapGetters(["getUserGames"]),
      userGames() {
        return this.getUserGames;
      },
    },

    methods: {
      ...mapActions(["fetchUserGameList"]),
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
