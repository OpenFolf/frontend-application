<template>
  <fragment>
    <v-app-bar color="primary" app flat id="scorecard-topbar" width="100%">
      <v-toolbar-title class="headline font-weight-bold" flat>
        Game Code: {{ getGame.lobbyCode }}
      </v-toolbar-title>
      <v-spacer />
      <v-speed-dial v-model="fab" top right direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn fab v-model="fab" color="info">
            <v-icon v-if="fab">fa-times-circle</v-icon>
            <v-icon v-else>fa-bars</v-icon>
          </v-btn>
        </template>
        <v-btn fab @click="refreshGame" small color="green">
          <v-icon>fa-sync-alt</v-icon>
        </v-btn>
        <v-btn fab @click="finishGame" small color="red">
          <v-icon>fa-skull-crossbones</v-icon>
        </v-btn>
        <v-btn fab small color="blue" @click="lng">
          <v-icon>fa-long-arrow-alt-down</v-icon>
        </v-btn>
        <v-btn fab small color="orange" @click="zig">
          <v-img :src="require('@/assets/zigzagprimary.png')" height="25" width="25" contain />
        </v-btn>
      </v-speed-dial>
    </v-app-bar>
    <v-app-bar class="d-flex justify-center align-center" height="180px" bottom app>
      <v-card flat color="primary" width="100%" class="">
        <v-card-title class="mb-0 font-weight-bold headline">
          <v-spacer />
          <v-icon class="mr-2">fa-user</v-icon>
          <span class="mr-2">{{ getPlayers[selectedPlayer].user.username }} |</span>
          <v-img
            :src="require('@/assets/basket_white.png')"
            max-width="2rem"
            height="2rem"
            contain
          />
          <span class="display-1 font-weight-bold mr-2">{{ selectedHole + 1 }}</span> |
          <span class="mx-2">Par :</span>
          <v-avatar tile color="red" class="font-weight-bold display-1">
            {{ selectedPar == "0" ? "-" : selectedPar }}
          </v-avatar>
          <v-spacer />
          <!-- <v-btn-toggle color="accent" v-model="zigZag" mandatory dense>
            <v-btn depressed>
              <v-icon>fa-long-arrow-alt-down</v-icon>
            </v-btn>
            <v-btn depressed>
              <v-img :src="require('@/assets/zigzagprimary.png')" height="25" width="25" contain />
            </v-btn>
          </v-btn-toggle> -->
        </v-card-title>
        <v-card-actions>
          <v-btn class="font-weight-bold headline" @click="setScore(0)" depressed>0</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(1)" depressed>1</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(2)" depressed>2</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(3)" depressed>3</v-btn>
          <v-btn class="font-weight-bold headline" @click="setScore(4)" depressed>4</v-btn>
        </v-card-actions>
        <v-card-actions class="mb-3">
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
                    <th
                      v-for="player in getPlayers"
                      :key="player.id"
                      class="title font-weight-bold text-center"
                    >
                      {{ player.user.username }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(hole, holeIndex) in getHoles" :key="hole.no">
                    <td
                      v-for="(player, playerIndex) in getPlayers"
                      :key="playerIndex"
                      :id="`p${playerIndex}h${holeIndex}`"
                      :style="inputStyles(`p${playerIndex}h${holeIndex}`)"
                      class="text-center headline font-weight-bold"
                      @click="activeHole(playerIndex, holeIndex, hole.redPar)"
                    >
                      {{ player.scoreArray[holeIndex] }}
                    </td>
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
        selectedPar: 0,
        zigZag: 0,
        dropdown_font: ["Arial", "Calibri", "Courier", "Verdana"],
        fab: false,
        lng: "",
        zig: "",
      };
    },
    computed: {
      ...mapGetters(["getGame", "getGameStatus", "getPlayers", "getHoles"]),
    },
    components: { Fragment },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
      this.selectedPar = this.getHoles[0].redPar;
      this.bottomNavHandler(false);
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
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
      loadHoles() {
        // calculate the total of the par scores
        this.getHoles.forEach((m) => {
          this.redParSum += parseInt(m.redPar);
        });
      },
      activeHole(playerIndex, holeIndex, holePar) {
        this.selectedPlayer = playerIndex;
        this.selectedHole = holeIndex;
        this.selectedPar = holePar;
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

<style scoped>
  th {
    background-color: #005737;
  }
</style>
