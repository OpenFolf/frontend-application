<template>
  <fragment>
    <v-app-bar color="primary" dark app flat>
      <v-toolbar-title class="display-1 font-weight-bold" flat>
        Lobby
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="justify-center">
        <v-row>
          <v-col cols="12" class="align-content-space-between">
            <v-card class="d-flex justify-center" color="secondary">
              <v-card-title class="white--text headline text-center font-weight-bold" flat>
                <span class="headline font-weight-bold mx-3">{{ getGame.course.name }}</span>
              </v-card-title>
            </v-card>
            <v-card class="d-flex justify-center" color="lobbyCode">
              <v-card-title class="white--text headline text-center font-weight-bold" flat>
                CODE: <span class="display-2 font-weight-bold mx-3">{{ getGame.lobbyCode }}</span>
              </v-card-title>
            </v-card>
            <v-simple-table hide-actions class="table-bordered">
              <thead class="secondary">
                <tr>
                  <th
                    class="white--text text-center rounded headline font-weight-bold"
                    flat
                    colspan="2"
                  >
                    Players
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in getPlayers" :key="index" class="secondary">
                  <td>
                    <v-icon v-if="!index" small color="warning" class="mr-2">fa-crown</v-icon>
                    <span class="font-weight-medium white--text">
                      {{ player.user.email }}
                    </span>
                  </td>
                  <td class="text-right font-weight-bold">
                    <template v-if="isOwner && getUser.id !== player.user.id">
                      <confirm-dialogue
                        :userToRemove="player.id"
                        :dialog="kickUserDialog"
                        :message="kickUserMsg"
                        @removeUser="removeUser"
                      />
                    </template>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <v-card class="mt-2" flat outlined>
              <v-skeleton-loader type="list-item" />
            </v-card>

            <v-card flat outlined class="mt-2">
              <v-card-actions>
                <confirm-dialogue
                  v-if="!isOwner"
                  :dialog="leaveGameDialog"
                  :message="leaveMsg"
                  :userToRemove="getPlayerId"
                  @removeUser="removeUser"
                />
                <confirm-dialogue
                  v-if="isOwner"
                  :dialog="startGameDialog"
                  :message="startGameMsg"
                  @start="startGame"
                />
              </v-card-actions>
              <v-card-actions>
                <confirm-dialogue
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
          headerColor: "success",
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
      this.subscribeToGame();
      window.addEventListener("blur", this.unSubscribeToGame);
      window.addEventListener("focus", this.subscribeToGame);
      this.inGameRouting("lobby");
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

<style lang="scss" scoped>
  tbody {
    border: thin solid rgba(255, 255, 255, 0.12);
  }
</style>
