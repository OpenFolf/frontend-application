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
            v-for="(gameList, gameListIndex) in getUserGames"
            :key="gameList.id"
            @click="openModal(gameListIndex)"
          >
            <v-card-title>{{ gameList.course.courseName }} </v-card-title>
            <v-card-subtitle>{{ gameList.gameDate }}</v-card-subtitle>
            <v-card-text class="bold"
              >Players:
              <v-card-text v-for="players in gameList.players" :key="players.id">
                {{ players.user.email }}
                Score: {{ players.totalScore }}
              </v-card-text>
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
      ...mapGetters(["getUserGames"]),
      userGames() {
        //console.log("GetUserGames ", this.userGames);
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
