<template>
  <fragment>
    <v-app-bar dark color="primary" app flat width="100%">
      <v-btn color="#7CAA98" depressed @click="zigZag = !zigZag" class="mr-2 font-weight-bold">
        {{ zigZag ? "|" : "Z" }}
      </v-btn>
      <v-btn :color="!getIsUserDark ? 'accent' : 'warning'" depressed @click="setUserTheme">
        <v-icon :color="!getIsUserDark ? 'white' : 'black'">
          {{ !getIsUserDark ? "fa-moon" : "fa-sun" }}
        </v-icon>
      </v-btn>
      <v-spacer />
      <span class="font-weight-bold headline mr-2">{{ getGame.lobbyCode }}</span>
      <v-spacer />
      <confirm-dialogue :dialog="endGameDialog" :message="endGameMsg" @finishGame="finishGame" />
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
                      <v-badge color="error" :content="player.totalScore" bottom>
                        <span class="white--text">{{ player.user.username }}</span>
                      </v-badge>
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
                      {{ player.scoreArray[holeIndex] == "0" ? "-" : player.scoreArray[holeIndex] }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-bottom-navigation dark height="194px" app background-color="#005737">
      <v-card flat color="primary" width="100%">
        <v-card-title class="mb-0 font-weight-bold headline">
          <v-spacer />
          <v-icon class="mr-2">fa-user</v-icon>
          <span class="mr-2">{{ getPlayers[selectedPlayer].user.username }}</span>
          <v-spacer />
          <v-img
            :src="require('@/assets/basket_white.png')"
            max-width="2rem"
            height="2rem"
            contain
          />
          <span class="display-1 font-weight-bold mr-2">{{ selectedHole + 1 }}</span>
          <v-spacer />
          <span class="mx-2">Par :</span>
          <v-avatar :color="colorHandler" :class="textColorHandler">
            {{ selectedPar == "0" ? "-" : selectedPar }}
          </v-avatar>
          <v-spacer />
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn outlined class="font-weight-bold headline" @click="setScore(0)" depressed>0</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(1)" depressed>1</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(2)" depressed>2</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(3)" depressed>3</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(4)" depressed>4</v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-actions class="mb-3">
          <v-spacer />
          <v-btn outlined class="font-weight-bold headline" @click="setScore(5)" depressed>5</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(6)" depressed>6</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(7)" depressed>7</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(8)" depressed>8</v-btn>
          <v-btn outlined class="font-weight-bold headline" @click="setScore(9)" depressed>9</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-bottom-navigation>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import ConfirmDialogue from "../components/game/ConfirmDialogue.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "game-scorecard",
    data() {
      return {
        buttonSpacer: "  /  ",
        redParSum: 0,
        player: 0,
        selectedPlayer: 0,
        selectedHole: 0,
        selectedPar: 0,
        zigZag: 0,
        fab: false,
        lng: "",
        zig: "",
        endGameDialog: false,
        endGameMsg: {
          title: "End Game",
          body: "Are you sure you want to end the game? This will end the game for all players.",
          button1: "No",
          button2: "Yes",
          headerColor: "error",
        },
      };
    },
    computed: {
      ...mapGetters([
        "getGame",
        "getGameStatus",
        "getPlayers",
        "getHoles",
        "getUser",
        "getTo",
        "getIsUserDark",
      ]),
      colorHandler() {
        return this.getHoles[0].whitePar > 0 ? "white" : "red";
      },
      localSelectedPar() {
        if (this.getHoles[0].whitePar > 0) {
          return this.getHoles[0].whitePar;
        } else {
          return this.getHoles[0].redPar;
        }
      },
      textColorHandler() {
        return this.getHoles[0].whitePar > 0
          ? "font-weight-bold display-1 black--text"
          : "font-weight-bold display-1";
      },
    },
    components: { Fragment, ConfirmDialogue },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
      this.selectedPar = this.localSelectedPar;
      this.bottomNavHandler(false);
      window.addEventListener("blur", this.unSubscribeToPlayerList);
      window.addEventListener("focus", this.subscribeToPlayerList);
      this.scorecardRouting("scorecard");
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
        "scorecardRouting",
        "unSubscribeToPlayerList",
        "setUserTheme",
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
            this.selectedHole != this.getGame.course.holeCount - 1
          ) {
            this.selectedPlayer = 0;
            this.selectedHole++;
          }
        } else {
          if (this.selectedHole < this.getHoles.length - 1) {
            this.selectedHole++;
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
        this.scorecardRouting();
      },
    },
  };
</script>

<style scoped>
  th {
    background-color: #005737;
  }
</style>
