<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <user-stats-list-item
          v-if="modalVisible"
          @close="modalVisible = false"
          :modalVisible="modalVisible"
          :gameListIndex="modalIndex"
        />
        <v-card
          color="secondary"
          ripple
          flat
          class="mb-2"
          v-for="(gameList, gameListIndex) in getUserGames"
          :key="gameList.id"
          @click="openModal(gameListIndex)"
        >
          <v-card-title class="white--text font-weight-bold headline">
            {{ gameList.course.courseName }}
          </v-card-title>
          <v-card-subtitle class="white--text font-weight-bold title">
            {{ gameList.gameDate }}
          </v-card-subtitle>
          <v-card-text class="white--text font-weight-bold">
            Players:
            <ul>
              <li v-for="players in gameList.players" :key="players.id">
                {{ players.user.username }} - Score: {{ players.totalScore }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      ...mapGetters(["getUserGames"]),
      userGames() {
        return this.getUserGames;
      },
      humanReadableDate(epoch) {
        return new Date(epoch * 1000).toLocaleString("da-DK");
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
