<template>
  <fragment>
    <v-app-bar color="primary" app flat id="scorecard-topbar" width="100%">
      <v-toolbar-title class="headline font-weight-bold" flat>
        Game Code: {{ getGame.lobbyCode }}
      </v-toolbar-title>
      <v-spacer />
      <v-speed-dial v-model="fab" top right direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="info">
            <v-icon v-if="fab">fa-times-circle</v-icon>
            <v-icon v-else>fa-bars</v-icon>
          </v-btn>
        </template>
        <v-btn @click="refreshGame" small color="green">
          <v-icon>fa-sync-alt</v-icon>
        </v-btn>
        <v-btn @click="finishGame" small color="red">
          <v-icon>fa-skull-crossbones</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>
    <v-app-bar class="d-flex justify-center align-center" height="180px" bottom app>
      <v-card flat color="primary" width="100%" class="">
        <v-card-title class="font-weight-bold headline">
          {{ getPlayers[selectedPlayer].user.username }}
          hole nr.
          {{ selectedHole + 1 }}
          <v-spacer />
          <v-btn-toggle color="accent" v-model="zigZag" mandatory dense>
            <v-btn depressed>
              <v-icon>fa-long-arrow-alt-down</v-icon>
            </v-btn>
            <v-btn depressed>
              <v-img :src="require('@/assets/zigzagprimary.png')" height="25" width="25" contain />
            </v-btn>
          </v-btn-toggle>
        </v-card-title>
        <v-card-actions>
          <v-btn class="font-weight-bold headline" @click="setScore(0)" depressed>0</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(1)" depressed>1</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(2)" depressed>2</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(3)" depressed>3</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(4)" depressed>4</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="font-weight-bold headline" @click="setScore(5)" depressed>5</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(6)" depressed>6</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(7)" depressed>7</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(8)" depressed>8</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(9)" depressed>9</v-btn>
        </v-card-actions>
      </v-card>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="accent" class="fill-height overflow-x-auto overflow-y-auto">
              <v-simple-table class="">
                <thead class="header" bold>
                  <tr>
                    <!-- <th class="title">Hole</th>
                      <th class="title ">Par</th> -->
                    <!-- <template v-for="player in getPlayers" :key="player.id"> -->
                    <th
                      v-for="player in getPlayers"
                      :key="player.id"
                      class="title font-weight-bold text-center"
                    >
                      {{ player.user.username }}
                    </th>
                    <!-- </template> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hole, holeIndex) in getHoles" :key="hole.no">
                    <!-- <td class="diff text-center">{{ holeIndex + 1 }}</td>
                      <td class="diff text-center">{{ hole.redPar }}</td> -->
                    <!-- <template v-for="(player, playerIndex) in getPlayers" :key="playerIndex"> -->
                    <td
                      v-for="(player, playerIndex) in getPlayers"
                      :key="playerIndex"
                      :id="`p${playerIndex}h${holeIndex}`"
                      :style="inputStyles(`p${playerIndex}h${holeIndex}`)"
                      class="text-center headline font-weight-bold"
                      @click="activeHole(playerIndex, holeIndex)"
                    >
                      {{ player.scoreArray[holeIndex] }}
                    </td>
                    <!-- </template> -->
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
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
        dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
        fab: false,
      };
    },

    computed: {
      ...mapGetters(["getGame", "getGameStatus", "getPlayers", "getHoles"]),
    },

    components: { Fragment },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
    },

    methods: {
      ...mapActions([
        "updatePlayer",
        "subscribeToPlayerList",
        "finishGame",
        "showBottomNav",
        "refreshGame",
        "inGameRouting",
      ]),
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
