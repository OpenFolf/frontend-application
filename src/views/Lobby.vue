<template>
  <fragment>
    <v-app-bar color="primary" app flat>
      <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
      <v-toolbar-title class="headline font-weight-bold" flat>
        / {{ getGame.course.name ? getGame.course.name : "ERROR" }}
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="justify-center">
        <v-row>
          <v-col cols="12" class="align-content-space-between">
            <v-card class="d-flex justify-center" color="info">
              <v-card-title class="headline text-center font-weight-bold" flat>
                Lobby: <span class="display-2 font-weight-bold mx-3">{{ getGame.lobbyCode }}</span>
              </v-card-title>
            </v-card>
            <v-simple-table hide-actions>
              <thead class="secondary">
                <tr>
                  <th class="text-center rounded headline font-weight-bold" flat colspan="2">
                    Players
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in getPlayers" :key="index">
                  <td>
                    <v-icon v-if="!index" small color="warning" class="mr-2">fa-crown</v-icon>
                    {{ player.user.email }}
                  </td>
                  <td class="text-right">
                    <template v-if="isOwner && getUser.id !== player.user.id">
                      <ConfirmDialogue
                        :userToRemove="player.id"
                        :dialog="kickUserDialog"
                        :message="kickUserMsg"
                        @removeUser="removeUser"
                      />
                    </template>
                  </td>
                </tr>

                <tr>
                  <td v-if="otherPlayers" colspan="2">
                    <v-skeleton-loader type="list-item"></v-skeleton-loader>
                  </td>
                </tr>
                <tr>
                  <td v-if="otherPlayers" colspan="2">
                    <v-skeleton-loader type="list-item"></v-skeleton-loader>
                  </td>
                </tr>
                <tr>
                  <td v-if="otherPlayers" colspan="2">
                    <v-skeleton-loader type="list-item"></v-skeleton-loader>
                  </td>
                </tr>
                <tr>
                  <td v-if="otherPlayers" colspan="2">
                    <v-skeleton-loader type="list-item"></v-skeleton-loader>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-card>
              <v-card-actions>
                <ConfirmDialogue
                  v-if="!isOwner"
                  :dialog="leaveGameDialog"
                  :message="leaveMsg"
                  :userToRemove="getPlayerId"
                  @removeUser="removeUser"
                />
                <ConfirmDialogue
                  v-if="isOwner"
                  :dialog="startGameDialog"
                  :message="startGameMsg"
                  @start="startGame"
                />
              </v-card-actions>
              <v-card-actions>
                <ConfirmDialogue
                  v-if="isOwner"
                  :dialog="cancelGameDialog"
                  :message="cancelGameMsg"
                  @cancelGame="cancelThisGame"
                />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import ConfirmDialogue from "../components/game/ConfirmDialogue.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "lobby",
    data() {
      return {
        startGameDialog: false,
        leaveGameDialog: false,
        kickUserDialog: false,
        cancelGameDialog: false,

        startGameMsg: {
          title: "Start Game",
          body: "Are you sure you want to start the game?",
          button1: "Cancel",
          button2: "Start",
          headerColor: "primary",
        },
        leaveMsg: {
          title: "Leave Lobby",
          body: "Are you want to leave?",
          button1: "No",
          button2: "Yes",
          headerColor: "error",
        },
        kickUserMsg: {
          icon: "fa-minus-circle",
          title: "Kick Player",
          body: "Are you sure you want kick the player?",
          button1: "Cancel",
          button2: "Yes",
        },
        cancelGameMsg: {
          title: "Cancel Game",
          body: "Are you want cancel the game?",
          button1: "No",
          button2: "Yes",
          headerColor: "error",
        },
      };
    },
    created() {
      this.fetchGame(this.getGame.id);
      this.bottomNavHandler(false);
      // Subscription
      this.subscribeToGame();
      window.addEventListener("blur", this.unSubscribeToGame);
      window.addEventListener("focus", this.subscribeToGame);
    },
    beforeDestroy() {
      window.removeEventListener("blur", this.unSubscribeToGame);
      window.removeEventListener("focus", this.subscribeToGame);
    },
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters(["getGame", "getGameStatus", "getUser", "getPlayers", "getGameType"]),
      isOwner() {
        return this.getUser.id === this.getGame.owner.id;
      },
      getPlayerId() {
        return this.getPlayers.find((p) => p.user.id === this.getUser.id).id;
      },
      otherPlayers() {
        return this.getPlayers.length <= 1;
      },
    },
    components: { Fragment, ConfirmDialogue },
    methods: {
      ...mapActions([
        "startGame",
        "fetchGame",
        "subscribeToGame",
        "deletePlayer",
        "refreshLobby",
        "showBottomNav",
        "cancelGame",
        "inGameRouting",
        "deletePlayerRouting",
        "browserStateListenGame",
        "unSubscribeToGame",
      ]),
      removeUser(playerId) {
        this.deletePlayer(playerId);
      },
      cancelThisGame() {
        console.log("Lobby>cancelThisGame");
        this.cancelGame(this.getGame.id);
      },
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
      subscribeHandler() {
        this.subscribeToGame();
      },
      unSubscribeHandler() {
        this.unSubscribeHandler();
      },
    },
    watch: {
      getGameStatus() {
        this.inGameRouting();
      },
      getGameType() {
        this.deletePlayerRouting();
      },
    },
  };
</script>
