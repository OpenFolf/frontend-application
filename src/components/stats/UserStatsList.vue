<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="12">
          <user-stats-list-item
            v-if="modalVisible"
            @close="modalVisible = false"
            :modalVisible="modalVisible"
            :gameListIndex="modalIndex"
          >
          </user-stats-list-item>
          <v-card
            color="secondary"
            ripple
            flat
            class="mb-2"
            v-for="(gameList, gameListIndex) in getUserHistory"
            :key="gameList.id"
            @click="openModal(gameListIndex)"
          >
            <v-card-title>[Course Name], {{ gameList.game.gameDate }} </v-card-title>
            <v-card-text>Players:</v-card-text>
            <v-card-text v-for="players in gameList.game.players.items" :key="players.id">
              {{ players.user.username }}
              {{ players.totalScore }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import UserStatsListItem from "./UserStatsListItem";
  import { mapGetters } from "vuex";
  export default {
    name: "user-stats-list",
    data() {
      return {
        modalIndex: null,
        modalVisible: false,
      };
    },
    components: { UserStatsListItem },
    computed: {
      ...mapGetters(["getUserHistory", "getUserHistoryGameListItem"]),
      userGames() {
        return this.getUserHistory;
      },
    },
    methods: {
      openModal(gameListIndex) {
        this.modalIndex = gameListIndex;
        this.modalVisible = true;
      },
    },
  };
</script>
