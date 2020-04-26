<template>
  <v-dialog v-model="localModalVisible" overlay-opacity="0.7">
    <v-card color="secondary" ripple flat class="mb-2" @click="$emit('close')">
      <!-- <v-card-title>{{ getUserHistory[gameListIndex].id }} </v-card-title> -->
      <v-card-title>[CourseName]</v-card-title>
      <v-card-subtitle>{{ getUserHistory[gameListIndex].game.gameDate }}</v-card-subtitle>
      <v-card-text v-for="players in gameItem" :key="players.id">
        Date:{{ game.gameDate }} Tee name: {{ players.user.username }} Email:
        {{ players.user.email }}
      </v-card-text>

      <v-simple-table class="mx-auto">
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
            <tr v-for="(hole, holeIndex) in gameItem[0].scoreArray" :key="holeIndex">
              <td class="diff text-center">{{ holeIndex }}</td>
              <td class="diff text-center">par?</td>
              <fragment v-for="(player, playerIndex) in gameItem" :key="playerIndex">
                <td class="text-center">
                  {{ player.scoreArray[holeIndex] }}
                </td>
              </fragment>
            </tr>
          </tbody>

          <thead class="header" bold>
            <tr>
              <th class="title text-center">Total:</th>
              <th class="title text-center">totalPar?</th>
              <fragment v-for="players in gameItem" :key="players.id">
                <th class="title text-center">
                  {{ players.totalScore }}
                </th>
              </fragment>
            </tr>
          </thead>
        </template>
      </v-simple-table>
      <pre>{{ getCourses }}</pre>
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
      ...mapGetters(["getUserHistory", "getCourses"]),
      userGames() {
        return this.getUserHistory;
      },
      game() {
        return this.getUserHistory[this.gameListIndex].game;
      },
      gameItem() {
        return this.getUserHistory[this.gameListIndex].game.players.items;
      },
    },
    components: {
      Fragment,
    },
    methods: {},
  };
</script>
