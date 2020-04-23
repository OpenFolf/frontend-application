<template>
  <fragment>
    <v-app-bar color="primary" app flat>
      <v-toolbar-title>{{ getGame.course.name ? getGame.course.name : "ERROR" }} </v-toolbar-title>
      <v-spacer />
      <v-banner single-line class="text-center">
        <span> Lobby Code: </span>
        <span class="font-weight-bold pa-2">
          {{ getGame.lobbyCode }}
        </span>
      </v-banner>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="justify-center">
        <v-row>
          <v-col class="col-12 align-content-space-between">
            <v-simple-table hide-actions>
              <thead class="secondary">
                <tr>
                  <th class="table-text  text-center title rounded" colspan="2">Players</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in getPlayers" :key="index">
                  <td>
                    <v-icon v-if="!index" small color="warning" class="mr-2">fa-crown</v-icon>
                    {{ player.user.email }}
                  </td>
                  <td class="text-right">
                    <fragment v-if="isOwner && getUser.id !== player.user.id">
                      <ConfirmDialogue
                        :userToRemove="player.id"
                        :dialog="kickUserDialog"
                        :message="kickUserMsg"
                        @removeUser="removeUser"
                      />
                    </fragment>
                  </td>
                </tr>

                <td v-if="otherPlayers" colspan="2">
                  <v-data-table
                    class=""
                    loading
                    loading-text="Waiting for other users to join"
                    hide-default-footer
                  />
                </td>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-card flat>
          <v-btn color="info" @click="refreshLobby">Refresh</v-btn>
        </v-card>
        <ConfirmDialogue
          v-if="!isOwner"
          :dialog="leaveGameDialog"
          :message="leaveMsg"
          :userToRemove="getPlayerId"
          @removeUser="removeUser"
        />
        <ConfirmDialogue
          v-if="isOwner"
          :dialog="cancelGameDialog"
          :message="cancelGameMsg"
          @cancelGame="cancelThisGame"
        />
        <ConfirmDialogue
          v-if="isOwner"
          :dialog="startGameDialog"
          :message="startGameMsg"
          @start="startGame"
        />
        <v-container class="d-flex flex-column align-center justify-center">
          <pre class="mb-5">{{ $log(getGame.id) || getGame.id }}</pre>
          <v-divider />
          <pre class="mb-5">{{ $log(getGameType) || getGameType }}</pre>
        </v-container>
        <!-- <v-card class="pa-1 overflow-x-auto">
          <pre class="mb-5">{{ $log(getGame) || getGame }}</pre>
        </v-card> -->
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
      ]),
      removeUser(playerId) {
        this.deletePlayer(playerId);
      },
      cancelThisGame() {
        console.log("Lobby>cancelThisGame");
        this.cancelGame(this.getGame.id);
      },
    },
    watch: {
      getGameStatus() {
        this.inGameRouting();
      },
      getGame: {
        immediate: true,
        handler() {
          this.subscribeToGame();
        },
      },
      getGameType() {
        console.log("GameType changed");
        const gamePlayers = this.getGame.players.items;
        const userId = this.getUser.id;
        let playerInGame = false;
        // Loop through and check if user is player in game
        for (let i = 0; i < gamePlayers.length; i++) {
          if (gamePlayers[i].user.id == userId) {
            // If he is user in game then set playerInGame bool to true
            playerInGame = true;
          }
        }

        if (!playerInGame) {
          this.showBottomNav(false);
          this.$router.push({ name: "home-menu" });
        }
      },
    },
  };
</script>
