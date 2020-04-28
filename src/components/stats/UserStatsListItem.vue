<template>
  <v-dialog v-model="dialog" width="400" overlay-opacity="0.7">
    <template v-slot:activator="{ on }">
      <v-card
        v-on="on"
        color="addedColor"
        flat
        class="mb-2"
        v-for="(gameList, gameListIndex) in getUserGames"
        :key="gameList.id"
        @click.stop="openModal(gameListIndex)"
      >
        <v-toolbar flat color="secondary">
          <v-toolbar-title class=" white--text headline ">
            {{ gameList.course.courseName }} -
          </v-toolbar-title>
          <br />
          <v-toolbar-title class=" white--text title ">
            {{ ` ${gameList.gameDate}` }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <ul class="white--text pl-0">
            <li
              v-for="players in gameList.players"
              :key="players.id"
              class="d-flex flex-row justify-space-between title"
            >
              <span> {{ players.user.email }} </span>
              <span> Score: {{ players.totalScore }} </span>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </template>
    <v-card color="secondary" flat @click="dialog = false">
      <v-card-title class="font-weight-bold title white--text"
        >{{ getUserGames[modalIndex].course.courseName }} -
        {{ getUserGames[modalIndex].gameDate }}</v-card-title
      >

      <v-simple-table class="mx-auto" dense>
        <template v-slot:default>
          <thead class="header" bold>
            <tr>
              <th class="title text-center white--text">Hole</th>
              <th class="title text-center  white--text">Par</th>

              <th
                v-for="teeName in gameItem"
                :key="teeName.id"
                class="title text-center  white--text"
              >
                {{ teeName.user.username }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hole, holeIndex) in game.course.par" :key="holeIndex">
              <td class="text-center">{{ holeIndex }}</td>
              <td class="text-center">
                {{ game.course.par[0].redPar }}
              </td>
              <td class="text-center" v-for="(player, playerIndex) in gameItem" :key="playerIndex">
                {{ player.scoreArray[holeIndex] }}
              </td>
            </tr>
          </tbody>
          <tfoot class="footer" bold>
            <tr>
              <th class="title text-center  white--text">Total:</th>
              <th class="title text-center  white--text">{{ game.course.totalPar }}</th>
              <th
                class="title text-center  white--text"
                v-for="(player, playerIndex) in gameItem"
                :key="playerIndex"
              >
                {{ player.totalScore }}
              </th>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "user-stats-list-item",

    data() {
      return {
        dialog: false,
        modalIndex: 0,
      };
    },
    computed: {
      ...mapGetters(["getUserGames"]),
      userGames() {
        return this.getUserGames;
      },
      game() {
        return this.getUserGames[this.modalIndex];
      },
      gameItem() {
        return this.getUserGames[this.modalIndex].players;
      },
    },
    methods: {
      openModal(gameListIndex) {
        this.modalIndex = gameListIndex;
      },
    },
    watch: {
      preventDialogFromScrollingToTop() {
        document.getElementsByClassName("v-dialog--active")[0].scrollTop = 0;
      },
    },
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
