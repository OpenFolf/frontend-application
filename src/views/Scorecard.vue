<template>
  <v-content>
    <v-container fluid fill-height>
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
              <td class="text-center">{{ index + 1 }}</td>
              <!-- Change get current user par -->
              <td class="text-center">{{ hole.redPar }}</td>
              <fragment v-for="(player, playerIndex) in getGame.players.items" :key="playerIndex">
                <td class="text-center" ref="`payer-hole-${index}" @click="$log($refs)">
                  {{ player.scoreArray[index] }}
                </td>
              </fragment>
            </tr>
          </tbody>
          <thead class="footer">
            <tr>
              <th class="bold body-1">Total</th>
              <th class="bold body-1">
                <!-- {{ redParSum }} -->
              </th>
              <!-- <fragment v-for="player in getGame.players.items" :key="player.id">
                <th class="bold body-1">??</th>
              </fragment> -->
            </tr>
          </thead>
        </template>
      </v-simple-table>
      <v-form @submit.prevent>
        <v-text-field v-model="player" label="player" type="number" />
        <v-text-field v-model="holeNumber" label="holeNumber" type="number" />
        <v-text-field v-model="score" label="score" type="number" />
        <v-btn @click="updateScorecard" color="success">Update</v-btn>
      </v-form>
      <v-card class="pa-1 overflow-x-auto">
        <pre class="mb-5">{{ getGame.players.items[0].scoreArray }}</pre>
        <!-- <pre class="mb-5">{{ getGame }}</pre> -->
        <!-- <pre class="mb-5">{{ getCurrentCourse }}</pre> -->
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
  import { Fragment } from "vue-fragment";
  //  import Vue from "vue";
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
      ...mapGetters(["getGame"]),
    },

    components: { Fragment },
    created() {
      this.loadHoles();
      this.subscribeToPlayerList();
    },
    watch: {
      getGame(newValue, oldValue) {
        console.log(`Watch>getGame>Updating from ${oldValue} to ${newValue}`);
        //this.componentKey += 1;
        //this.$forceUpdate();
      },
    },

    methods: {
      ...mapActions(["updatePlayer", "subscribeToPlayerList"]),
      loadHoles: function() {
        // calculate the total of the par scores
        this.getGame.course.holes.items.forEach((m) => {
          this.redParSum += parseInt(m.redPar);
        });
      },

      updateScorecard() {
        const oldScore = this.getGame.players.items[this.player].scoreArray.map((x) => x);
        console.log("id", this.getGame.players.items[this.player].id);
        console.log("oldScore", oldScore);
        console.log("NewOldScore", (oldScore[this.holeNumber] = this.score));
        console.log("oldScoerArr", oldScore);

        const payLoadObject = {
          id: this.getGame.players.items[this.player].id,
          scoreArray: oldScore,
        };
        this.updatePlayer(payLoadObject);
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
    background-color: var(--v-secondary-darken1);
    color: #ffffff;
  }
</style>
