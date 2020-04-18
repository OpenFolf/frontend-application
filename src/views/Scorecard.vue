<template>
  <fragment>
    <v-app-bar color="primary" app>
      <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
      <v-toolbar-title class="headline font-weight-bold" flat>
        {{ $route.params.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn color="error" @click="finishGame">finish</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="d-flex flex-column align-center justify-center">
        <v-simple-table class="mx-auto">
          <template v-slot:default>
            <thead class="header" bold>
              <tr>
                <th class="title">Hole</th>
                <th class="title ">Par</th>
                <fragment v-for="player in getGame.players.items" :key="player.id">
                  <th class="title text-center">{{ player.user.username }}</th>
                </fragment>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hole, index) in getGame.course.holes.items" :key="hole.no">
                <td class="diff text-center">{{ index + 1 }}</td>
                <td class="diff text-center">{{ hole.redPar }}</td>
                <fragment v-for="(player, playerIndex) in getGame.players.items" :key="playerIndex">
                  <td class="text-center" ref="player-hole" @click="$log($refs)">
                    {{ player.scoreArray[index] }}
                  </td>
                </fragment>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <table class="scorecard--keyboard">
          <thead>
            <tr>
              <th colspan="5">Focus: ({[ FOCUSED CELL ]})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
            </tr>
            <tr>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "game-scorecard",

    data() {
      return {
        redParSum: 0,
        player: 0,
        holeNumber: 0,
        score: 0,
        componentKey: 0,
        playerScore: [],
      };
    },
    computed: {
      ...mapGetters(["getGame", "getGameStatus"]),
    },

    components: { Fragment },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
    },
    // watch: {
    //   getGame(newValue, oldValue) {
    //     console.log(`Watch>getGame>Updating from ${oldValue} to ${newValue}`);
    //   },
    // },

    methods: {
      ...mapActions(["updatePlayer", "subscribeToPlayerList", "finishGame"]),
      loadHoles: function() {
        // calculate the total of the par scores
        this.getGame.course.holes.items.forEach((m) => {
          this.redParSum += parseInt(m.redPar);
        });
      },

      updateScorecard() {
        const oldScore = this.getGame.players.items[this.player].scoreArray.map((x) => x);
        const payLoadObject = {
          id: this.getGame.players.items[this.player].id,
          scoreArray: oldScore,
        };
        this.updatePlayer(payLoadObject);
      },
    },
    watch: {
      getGameStatus() {
        this.$router.push({ name: "stats" });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .scorecard--keyboard {
    margin-top: 2rem;
  }
  .scorecard--keyboard td,
  .scorecard--keyboard th {
    width: 4rem;
    height: 2rem;
    border: 1px solid #ccc;
    text-align: center;
  }
  t.scorecard--keyboard h {
    background: lightblue;
    border-color: white;
  }
  .diff {
    background-color: #ccc;
    color: #000;
  }
  body {
    padding: 1rem;
  }
  .header {
    background-color: var(--v-primary-base);
  }
  .footer {
    background-color: var(--v-primary-base);
  }

  table th + th {
    border-left: 1px solid var(--v-primary-lighten1);
  }
  table td + td {
    border-left: 1px solid var(--v-secondary-lighten1);
  }
  .theme--dark.v-data-table {
    background-color: var(--v-secondary-darken1);
    color: #ffffff;
  }
</style>
