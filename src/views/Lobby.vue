<template>
  <fragment>
    <v-app-bar color="primary" app flat>
      <v-toolbar-title
        >{{ $log("Lobby>Title, getGame.course.name", getGame.course.name) || getGame.course.name }}
      </v-toolbar-title>
      <v-spacer />
      <v-banner single-line class="text-center">
        <span> Code: </span><span class="font-weight-bold">{{ getGame.lobbyCode }}</span></v-banner
      >
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="justify-center">
        <v-row>
          <v-col class="col-12 align-content-space-between">
            <v-simple-table hide-actions>
              <thead class="secondary ">
                <tr>
                  <th class="table-text  text-center title rounded" colspan="2">Players</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in getGame.players.items" :key="index">
                  <td>
                    <fragment v-if="!index"
                      ><v-icon small color="warning" class="mr-2">fa-crown</v-icon></fragment
                    >
                    {{ player.user.email }}
                  </td>
                  <td class="text-right">
                    <fragment v-if="index && $store.getters.getUser.id !== player.user.id">
                      <ConfirmDialogue :dialog="dialog" :message="kickUserMsg" />
                    </fragment>
                  </td>
                </tr>

                <td v-if="getGame.players.items.length <= 1" colspan="2">
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
        <ConfirmDialogue :dialog="dialog" :message="leaveMsg" />

        <ConfirmDialogue :dialog="dialog" :message="continueMsg" />
        <v-card class="pa-1 overflow-x-auto">
          <pre class="mb-5">{{ $log(getGame) || getGame }}</pre>
        </v-card>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import ConfirmDialogue from "../components/game/ConfirmDialogue.vue";
  import { mapGetters } from "vuex";
  import Store from "../store";
  export default {
    name: "lobby",
    data() {
      return {
        dialog: false,

        continueMsg: {
          title: "Start Game",
          body: "Are you sure you want to start the game?",
          button1: "Cancel",
          button2: "Start",
          color: "primary",
        },
        leaveMsg: {
          title: "Leave Lobby",
          body: "Are you want to leave?",
          button1: "No",
          button2: "Yes",
          color: "error",
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
      //this.initialize();
      this.$Store.dispatch("fetchGame", this.getGame.id);
      //TODO: Remove when the game object is ready
      var indexOfOwner = this.getGame.players.items.findIndex(
        (o) => o.user.email === this.getGame.owner.email,
      );
      const ownerElement = this.getGame.players.items.splice(indexOfOwner, 1);
      this.getGame.players.items = [...ownerElement, ...this.game.players.items];
    },
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    computed: {
      ...mapGetters(["getGame"]),
    },
    components: { Fragment, ConfirmDialogue },
    methods: {
      refreshLobby() {
        Store.dispatch("fetchGame", this.getGame.id);
      },

      kickUser(item) {
        const index = this.joinedUsers.indexOf(item);
        confirm("Are you sure you want to kick user?") && this.joinedUsers.splice(index, 1);
      },
    },
  };
</script>
