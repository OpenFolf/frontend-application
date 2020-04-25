<template>
  <fragment>
    <v-app-bar color="primary" app flat>
      <v-banner single-line class="text-center">
        <span> Code: </span>
        <span class="font-weight-bold pa-2">
          {{ getGame.lobbyCode }}
        </span>
      </v-banner>
      <v-btn-toggle color="accent" v-model="zigZag" mandatory dense>
        <v-btn depressed>
          <v-icon>fa-long-arrow-alt-down</v-icon>
        </v-btn>
        <v-btn depressed>
          <v-img :src="require('@/assets/zigzagprimary.png')" height="25" width="25" contain />
        </v-btn>
      </v-btn-toggle>
      <v-spacer />
      <v-btn color="info" @click="refreshGame" depressed>refresh</v-btn>
      <v-btn color="error" @click="finishGame" depressed>finish</v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="d-flex flex-column align-center justify-center">
        <v-simple-table class="mx-auto">
          <template v-slot:default>
            <thead class="header" bold>
              <tr>
                <th class="title">Hole</th>
                <th class="title ">Par</th>
                <fragment v-for="player in getPlayers" :key="player.id">
                  <th class="title text-center">{{ player.user.username }}</th>
                </fragment>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(hole, holeIndex) in getHoles" :key="hole.no">
                <td class="diff text-center">{{ holeIndex + 1 }}</td>
                <td class="diff text-center">{{ hole.redPar }}</td>
                <fragment v-for="(player, playerIndex) in getPlayers" :key="playerIndex">
                  <td
                    :id="`p${playerIndex}h${holeIndex}`"
                    :style="inputStyles(`p${playerIndex}h${holeIndex}`)"
                    class="text-center"
                    @click="activeHole(playerIndex, holeIndex)"
                  >
                    {{ player.scoreArray[holeIndex] }}
                  </td>
                </fragment>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <table class="scorecard--keyboard">
          <thead>
            <tr>
              <th colspan="5">
                <span>{{ getPlayers[selectedPlayer].user.username }} </span
                ><span class="font-weight-light">
                  hole nr.
                </span>
                <span>{{ selectedHole + 1 }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <v-btn tile @click="setScore(0)">0</v-btn>
              <v-btn tile @click="setScore(1)">1</v-btn>
              <v-btn tile @click="setScore(2)">2</v-btn>
              <v-btn tile @click="setScore(3)">3</v-btn>
              <v-btn tile @click="setScore(4)">4</v-btn>
            </tr>
            <tr>
              <v-btn tile @click="setScore(5)">5</v-btn>
              <v-btn tile @click="setScore(6)">6</v-btn>
              <v-btn tile @click="setScore(7)">7</v-btn>
              <v-btn tile @click="setScore(8)">8</v-btn>
              <v-btn tile @click="setScore(9)">9</v-btn>
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
        selectedPlayer: 0,
        selectedHole: 0,
        zigZag: 0,
      };
    },

    computed: {
      ...mapGetters(["getGame", "getGameStatus", "getPlayers", "getHoles"]),
    },

    components: { Fragment },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
      this.bottomNavHandler(false);
      window.addEventListener("blur", this.unSubscribeToPlayerList);
      window.addEventListener("focus", this.subscribeToPlayerList);
    },
    beforeDestroy() {
      window.removeEventListener("blur", this.unSubscribeToPlayerList);
      window.removeEventListener("focus", this.subscribeToPlayerList);
    },
    methods: {
      ...mapActions([
        "updatePlayer",
        "subscribeToPlayerList",
        "finishGame",
        "showBottomNav",
        "refreshGame",
        "inGameRouting",
        "unSubscribeToPlayerList",
      ]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
      loadHoles() {
        // calculate the total of the par scores
        this.getHoles.forEach((m) => {
          this.redParSum += parseInt(m.redPar);
        });
      },
      activeHole(playerIndex, holeIndex) {
        this.selectedPlayer = playerIndex;
        this.selectedHole = holeIndex;
      },
      inputStyles(id) {
        if (`p${this.selectedPlayer}h${this.selectedHole}` === id) {
          return { background: "#808080" };
        }
      },
      setNextIndexActive() {
        if (this.zigZag) {
          if (this.selectedPlayer < this.getPlayers.length - 1) {
            this.selectedPlayer++;
          } else if (
            this.selectedPlayer === this.getPlayers.length - 1 &&
            this.selectedHole != this.getPlayers.length - 1
          ) {
            this.selectedPlayer = 0;
            this.selectedHole++;
          } else {
            console.log("Do you want to finish the game?");
          }
        } else {
          console.log("setNextIndexActive");
          if (this.selectedHole < this.getHoles.length - 1) {
            this.selectedHole++;
          } else {
            console.log("Do you want to finish the game?");
          }
        }
      },
      setScore(score) {
        const oldScore = this.getPlayers[this.selectedPlayer].scoreArray.map((x) => x);
        oldScore[this.selectedHole] = score;
        const payLoadObject = {
          id: this.getPlayers[this.selectedPlayer].id,
          scoreArray: oldScore,
        };
        this.updatePlayer(payLoadObject);
        this.setNextIndexActive();
      },
    },

    watch: {
      getGameStatus() {
        this.inGameRouting();
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
  .scorecard--keyboard h {
    background: lightblue;
    border-color: white;
  }
  // .diff {
  //   background-color: #ccc;
  //   color: #000;
  // }
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
    //background-color: var(--v-secondary-darken1);
    color: #ffffff;
  }

  // tr.v-data-table__selected {
  //   background: #7d92f5 !important;
  // }

  //
  .v-btn:hover:before {
    color: transparent;
  }
</style>
