<template>
  <fragment>
    <v-app-bar color="primary" app>
      <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
      <v-toolbar-title class="headline font-weight-bold" flat>
        {{ getGame.course.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn color="error" :to="{ name: 'home-menu' }">finish</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="d-flex flex-column align-center justify-center">
        <table>
          <!-- <template v-slot:default> -->
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
            <tr v-for="(hole, holeIndex) in getGame.course.holes.items" :key="hole.no">
              <td class="diff text-center">{{ holeIndex + 1 }}</td>
              <td class="diff text-center">{{ hole.redPar }}</td>
              <fragment v-for="(player, playerIndex) in getGame.players.items" :key="playerIndex">
                <td
                  class="text-center"
                  ref="player-hole"
                  @click="activeHole(playerIndex, holeIndex)"
                >
                  {{ player.scoreArray[holeIndex] }}
                </td>
              </fragment>
            </tr>
          </tbody>
          <!-- </template> -->
        </table>
        <table class="scorecard--keyboard">
          <thead>
            <tr>
              <th colspan="5">{{ selectedPlayer + 1 }}{{ selectedHole + 1 }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td @click="setScore(0)">0</td>
              <td @click="setScore(1)">1</td>
              <td @click="setScore(2)">2</td>
              <td @click="setScore(3)">3</td>
              <td @click="setScore(4)">4</td>
            </tr>
            <tr>
              <td @click="setScore(5)">5</td>
              <td @click="setScore(6)">6</td>
              <td @click="setScore(7)">7</td>
              <td @click="setScore(8)">8</td>
              <td @click="setScore(9)">9</td>
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
        selectedHole: 0,
        selectedPlayer: 0,
      };
    },
    computed: {
      ...mapGetters(["getGame"]),
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
      ...mapActions(["updatePlayer", "subscribeToPlayerList"]),
      loadHoles() {
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
      activeHole(playerIndex, holeIndex) {
        //console.log("event", ev); // this is the event

        this.selectedPlayer = playerIndex;
        this.selectedHole = holeIndex;

        console.log("holeIndex", holeIndex); // i is index of v-for
        console.log("PlayerIndex", playerIndex);
      },
      setScore(score) {
        console.log("score", score);
        const oldScore = this.getGame.players.items[this.selectedPlayer].scoreArray.map((x) => x);
        oldScore[this.selectedHole] = score;

        const payLoadObject = {
          id: this.getGame.players.items[this.selectedPlayer].id,
          scoreArray: oldScore,
        };
        this.updatePlayer(payLoadObject);
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
