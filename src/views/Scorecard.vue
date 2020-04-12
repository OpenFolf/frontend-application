<template>
  <v-content>
    <v-container fluid fill-height>
      <v-simple-table class="mx-auto">
        <template v-slot:default>
          <thead class="header" bold>
            <tr>
              <th class="title">Hole</th>

              <th class="title ">Par</th>

              <fragment v-for="(player, playerIndex) in players" :key="playerIndex">
                <th class="title text-center">{{ player.name }}</th>
              </fragment>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(hole, index) in par" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ hole }}</td>
              <fragment v-for="(player, playerIndex) in players" :key="playerIndex">
                <td :key="componentKey" class="text-center">
                  <button
                    type="button"
                    v-on:click="updateScore(index, playerIndex, 'down')"
                    class="mr-1"
                  >
                    <v-icon small>fas fa-minus-square</v-icon>
                  </button>

                  {{ $log("player.scores[index]", player.scores[index]) || player.scores[index] }}

                  <button type="button" v-on:click="updateScore(index, playerIndex, 'up')">
                    <v-icon small class="ml-1">fas fa-plus-square</v-icon>
                  </button>
                </td>
              </fragment>
            </tr>
          </tbody>
          <thead class="footer">
            <tr>
              <th class="bold body-1">Total</th>
              <th class="bold body-1">
                {{ parTotal }}
              </th>
              <fragment v-for="(player, playerIndex) in players" :key="playerIndex">
                <th class="bold body-1">{{ player.total }}</th>
              </fragment>
            </tr>
          </thead>
        </template>
      </v-simple-table>
    </v-container>
  </v-content>
</template>

<script>
  import { Fragment } from "vue-fragment";
  export default {
    name: "scorecard",

    data() {
      return {
        courseName: "Folf völlurinn sprell",
        currentUserName: "Siggi Hall",
        holes: 9,
        par: [3, 3, 4, 3, 5, 3, 4, 3, 3],
        parTotal: 0,
        numPlayers: 2,
        newScore: 0,
        players: {
          p1: {
            name: "Tim",
            scores: [],
            total: 0,
          },
          p2: {
            name: "Fran",
            scores: [],
            total: 0,
          },
        },
        componentKey: 0,
      };
    },
    components: { Fragment },
    created: function() {
      this.loadHoles();
      this.loadPlayers();
      this.calculateTotalScores();
    },

    methods: {
      log(message) {
        console.log(message);
      },
      loadHoles: function() {
        // calculate the total of the par scores
        for (var key in this.par) {
          if (Object.prototype.hasOwnProperty.call(this.par, key)) {
            var par = this.par[key];
            //console.log(par);
            this.parTotal += par;
          }
        }
      },
      loadPlayers: function() {
        // create empty scores (of 0) for each hole for each player for each hole
        for (var key in this.players) {
          if (Object.prototype.hasOwnProperty.call(this.players, key)) {
            var player = this.players[key];
            player.scores = [];

            for (var i = 0; i < this.holes; i++) {
              player.scores.push(0);
            }
          }
        }
      },
      updateScore: function(index, playerIndex, direction) {
        if (direction === "up") {
          this.newScore = this.players[playerIndex].scores[index] + 1;
        } else if (this.players[playerIndex].scores[index] > 0) {
          this.newScore = this.players[playerIndex].scores[index] - 1;
        } else {
          this.newScore = 0;
        }

        this.players[playerIndex].scores[index] = this.newScore;
        var tmp = this.players[playerIndex];
        console.log(this.players);
        //Should but dose not trigger a re-render of the table
        this.$set(this.players, playerIndex, tmp);
        //HACK: This forces a re-render of the component - https://michaelnthiessen.com/force-re-render/
        this.componentKey += 1;
        this.calculateTotalScores();
        console.log("this.players", this.players);
      },
      calculateTotalScores: function() {
        //adds up the total scores for each player
        for (var key in this.players) {
          if (Object.prototype.hasOwnProperty.call(this.players, key)) {
            var player = this.players[key];
            player.total = player.scores.reduce((a, b) => a + b, 0);
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
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
    background-color: var(--v-secondary-base);
    color: #ffffff;
  }
</style>
