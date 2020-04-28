<template>
  <v-container>
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
          app
          width="100%"
          class="mb-2"
          v-for="(gameList, gameListIndex) in getUserGames"
          :key="gameList.id"
          @click="openModal(gameListIndex)"
        >
          <v-card-title class="addedColor white--text">
            <h4>{{ gameList.course.courseName }} - {{ gameList.gameDate }}</h4>
          </v-card-title>

          <v-card-text class="bold">
            <v-card-text
              v-for="players in gameList.players"
              :key="players.id"
              class="d-flex justify-space-between"
              ><span class="text-left"> {{ players.user.email }} </span
              ><span class="text-left"> Score: {{ players.totalScore }} </span>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UserStatsListItem from "./UserStatsListItem.vue";
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
    },

    methods: {
      openModal(gameListIndex) {
        this.modalIndex = gameListIndex;
        this.modalVisible = true;
      },
    },
  };
</script>
