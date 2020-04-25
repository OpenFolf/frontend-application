<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="secondary"
            ripple
            flat
            class="mb-2"
            v-for="gameList in getUserHistory"
            :key="gameList.id"
          >
            <v-card-title>{{ gameList.game.gameDate }} </v-card-title>

            <v-card-text v-for="players in gameList.game.players.items" :key="players.id"
              >{{ players.user.id }}
              {{ players.user.username }}
              {{ players.user.email }}
            </v-card-text>
            <v-simple-table class="mx-auto">
              <template v-slot:default>
                <thead class="header" bold>
                  <tr>
                    <th class="title">Hole</th>
                    <th class="title ">Par</th>
                    <fragment v-for="teeName in gameList.game.players.items" :key="teeName.id">
                      <th class="title text-center">{{ teeName.user.username }}</th>
                    </fragment>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(hole, holeIndex) in gameList.game.players.items[0].scoreArray"
                    :key="holeIndex"
                  >
                    <td class="diff text-center">{{ holeIndex }}</td>
                    <td class="diff text-center">par ?</td>
                    <fragment
                      v-for="(player, playerIndex) in gameList.game.players.items"
                      :key="playerIndex"
                    >
                      <td :id="`p${playerIndex}h${holeIndex}`" class="text-center">
                        {{ player.scoreArray[holeIndex] }}
                      </td>
                    </fragment>
                  </tr>
                </tbody>

                <thead class="header" bold>
                  <tr>
                    <th class="title">Hole</th>
                    <th class="title ">Par</th>
                    <!-- <fragment
                      v-for="(players,) in gameList.game.players.items"
                      :key="players.id"
                    >
                      <th class="title text-center">
                        {{ playerScore }}
                      </th>
                    </fragment> -->
                  </tr>
                </thead>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div>{{ $log(getUserHistory) }}</div>
    <pre> {{ getUserHistory }} </pre>
  </v-content>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "stats",
    computed: {
      ...mapGetters(["getUserHistory", "getUserHistoryGameListItem"]),
      userGames() {
        return this.getUserHistory;
      },
    },
    playerScore() {
      return this.getUserHistory.map((m) => m.game);
    },
    components: {
      Fragment,
    },
    methods: {
      ...mapActions(["fetchUserGameList", "showBottomNav"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
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
        playerScore: [],
      };
    },
    created() {
      this.fetchUserGameList();
      this.bottomNavHandler(true);
    },
  };
</script>
