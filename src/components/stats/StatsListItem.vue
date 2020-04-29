<template>
  <!-- <v-dialog v-model="dialog" width="400" overlay-opacity="0.7">
    <template v-slot:activator="{ on }">
      <h1>Typpi1</h1>
      <h1>Typpi2</h1>
      <h1>Typpi3</h1>
      <v-btn @click="isPre = !isPre">toggle pre</v-btn>
      <v-card max-height="700px" class="overflow-y-auto">
        getUserGames:
        <pre v-if="isPre">{{ getUserGames }}</pre>
      </v-card>
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
            {{ gameList.gameDate }}
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
              <td class="text-center">{{ holeIndex + 1 }}</td>
              <td class="text-center">
                {{
                  game.course.par[0].whitePar > 0
                    ? game.course.par[0].whitePar
                    : game.course.par[0].redPar
                }}
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
  </v-dialog> -->

  <v-col cols="12">
    <v-card
      :to="{
        name: 'stats-item',
        params: { id: 4 },
      }"
      class="font-weight-bold"
      flat
      ripple
      outlined
    >
      <v-card color="addedColor" flat>
        <v-card-actions class="d-flex flex-column">
          <span class="font-weight-bold headline">{{ userGame.course.courseName }}</span>
          <span class="">{{ userGame.gameDate }}</span>
        </v-card-actions>
      </v-card>
      <v-card-text>
        <v-list flat>
          <v-subheader>REPORTS</v-subheader>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <ul>
          <li
            v-for="players in userGame.players"
            :key="players.id"
            class="d-flex flex-row justify-space-between"
          >
            <span> {{ players.user.username }} </span>
            <span> Score: {{ players.totalScore }} </span>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "stats-list-item",
    props: {
      userGame: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        dialog: false,
        modalIndex: 0,
        isPre: false,
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
