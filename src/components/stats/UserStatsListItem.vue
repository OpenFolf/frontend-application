<template>
  <v-dialog v-model="localModalVisible" overlay-opacity="0.7">
    <v-card color="secondary" flat class="mb-2" @click="$emit('close')">
      <!-- <v-card-title>{{ getUserGames[gameListIndex].id }} </v-card-title> -->
      <v-card-title>{{ getUserGames[gameListIndex].course.courseName }}</v-card-title>
      <v-card-subtitle>{{ getUserGames[gameListIndex].gameDate }}</v-card-subtitle>
      <!-- 
      <v-card-text v-for="players in gameItem" :key="players.id">
        {{ players.user.email }}
      </v-card-text> -->

      <v-simple-table class="mx-auto" dense>
        <template v-slot:default>
          <thead class="header" bold>
            <tr>
              <th class="title text-center">Hole</th>
              <th class="title text-center">Par</th>
              <fragment v-for="teeName in gameItem" :key="teeName.id">
                <th class="title text-center">{{ teeName.user.username }}</th>
              </fragment>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(hole, holeIndex) in game.course.par" :key="holeIndex">
              <td class="text-center">{{ holeIndex }}</td>
              <td class="text-center">
                {{ game.course.par[0].redPar }}
              </td>
              <fragment v-for="(player, playerIndex) in gameItem" :key="playerIndex">
                <td class="text-center">
                  {{ player.scoreArray[holeIndex] }}
                </td>
              </fragment>
            </tr>
          </tbody>

          <tfoot class="footer" bold>
            <tr>
              <th class="title text-center">Total:</th>
              <th class="title text-center">{{ game.course.totalPar }}</th>
              <fragment v-for="(player, playerIndex) in gameItem" :key="playerIndex">
                <th class="title text-center">
                  {{ player.totalScore }}
                </th>
              </fragment>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import { mapGetters } from "vuex";
  export default {
    name: "user-stats-list-item",
    props: {
      gameListIndex: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        localModalVisible: true,
      };
    },
    computed: {
      ...mapGetters(["getUserGames"]),
      userGames() {
        return this.getUserGames;
      },
      game() {
        return this.getUserGames[this.gameListIndex];
      },
      gameItem() {
        return this.getUserGames[this.gameListIndex].players;
      },
    },
    components: {
      Fragment,
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  table th + th {
    border-left: thin solid rgba(255, 255, 255, 0.12);
  }
  table td + td {
    border-left: thin solid rgba(255, 255, 255, 0.12);
  }
  table td {
    border-bottom: thin solid rgba(255, 255, 255, 0.12);
  }
  .v-btn:hover:before {
    color: transparent;
  }
  .header {
    background-color: var(--v-primary-base);
  }
  .footer {
    background-color: var(--v-primary-base);
  }
</style>
