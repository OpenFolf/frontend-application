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
                <tr v-for="(player, index) in getGame.players.items" :key="index">
                  <td>
                    <v-icon v-if="!index" small color="warning" class="mr-2">fa-crown</v-icon>
                    {{ player.user.email }}
                  </td>
                  <td class="text-right">
                    <fragment v-if="isOwner && getUser.id !== player.user.id">
                      <ConfirmDialogue
                        :userToRemove="player.user.id"
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
          :dialog="leaveGameDialog"
          :message="leaveMsg"
          :userToRemove="getUser.id"
          @removeUser="removeUser"
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
          <pre class="mb-5">{{ $log(getGameStatus) || getGameStatus }}</pre>
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
      };
    },
    created() {
      this.fetchGame(this.getGame.id);
      this.subscribeToGame();
    },
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters(["getGame", "getGameStatus", "getUser"]),
      isOwner() {
        return this.getUser.id === this.getGame.owner.id;
      },
      otherPlayers() {
        return this.getGame.players.items.length <= 1;
      },
    },
    components: { Fragment, ConfirmDialogue },
    methods: {
      ...mapActions(["startGame", "fetchGame", "subscribeToGame", "deletePlayer"]),
      refreshLobby() {
        this.fetchGame(this.getGame.id);
      },
      removeUser(userId) {
        console.log("methods>removeUser, userid", userId);
        this.deletePlayer(userId);
      },
    },
    watch: {
      getGameStatus() {
        this.$router.push({ name: "game-scorecard" });
      },
    },
  };
</script>
