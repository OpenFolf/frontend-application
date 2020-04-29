<template>
  <v-container fluid>
    <home-menu-item v-for="item in contentList" :key="item.id" :content="item" />
    <v-col cols="12">
      <v-btn color="success" block x-large dark @click.stop="dialog = true">
        <span class="headline">
          Play now!
        </span>
      </v-btn>

      <v-dialog v-model="dialog" overlay-opacity="0.7">
        <v-card color="accent">
          <v-card-title class="headline">How to openFOLF?</v-card-title>

          <v-card-text>
            Press the play button and select the course you wish to play and start a game lobby your
            friends can join.
          </v-card-text>

          <v-card color="secondary mr-2 ml-2 mb-2"
            ><v-card-actions class="d-flex flex-column">
              <span class="mb-3">Play a Game</span>
              <v-btn block @click="dialog = false" color="primary" :to="{ name: 'game' }">
                <v-icon>fa-play</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card-text class="mt-2">
            Want to join another players game lobby? Press the join button and enter your lobby
            code.
          </v-card-text>

          <v-card color="secondary mr-2 ml-2 mb-2">
            <v-card-actions class="d-flex flex-column">
              <span class="mb-3">Join a Game</span>
              <v-btn block @click="dialog = false" color="primary" :to="{ name: 'join-game' }">
                <v-icon>fa-compress-alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card-text>
            When all players have entered the game lobby start the game.
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-container>
</template>

<script>
  import HomeMenuItem from "./MenuItem.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "home-menu",
    components: {
      HomeMenuItem,
    },
    data() {
      return {
        dialog: false,
        contentList: [
          {
            id: 1,
            color: "info",
            title: "Your Profile",
            subtitle: "Set your Scorecard Name, Default Tee and Application Theme.",
            buttonText: "Edit Profile",
            routerPath: {
              name: "home-profile",
            },
          },
          {
            id: 2,
            color: "addedColor",
            title: "Disc Golf Rules",
            subtitle: "Do you know how to play Disc Golf? Read them here.",
            buttonText: "See Rules",
            routerPath: {
              name: "home-rules",
            },
          },
        ],
      };
    },
    created() {
      this.bottomNavHandler(true);
    },
    methods: {
      ...mapActions(["defaultRouting", "showBottomNav"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
    computed: {
      ...mapGetters(["signedIn"]),
    },
    watch: {
      signedIn() {
        this.defaultRouting();
      },
    },
  };
</script>
