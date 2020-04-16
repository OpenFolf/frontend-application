<template>
  <fragment>
    <v-app-bar color="primary" app flat>
      <v-toolbar-title>{{
        $log("Lobby>Title, getGame.course.name", getGame.course.name) || getGame.course.name
      }}</v-toolbar-title>
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
              <thead class="secondary">
                <tr>
                  <th class="table-text  text-center title" colspan="2">Players</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in getGame.players.items" :key="index">
                  <td>
                    <fragment v-if="!index"
                      ><v-icon small color="warning" class="mr-2">fa-crown</v-icon></fragment
                    >
                    {{
                      $log("Lobby>Title, ggetGame.players.items.course.name", player.user.email) ||
                        player.user.email
                    }}
                  </td>
                  <td class="text-right">
                    <fragment v-if="index && $store.getters.getUser.id !== player.user.id">
                      <v-icon color="error" small>fa-minus-circle</v-icon>
                    </fragment>
                  </td>
                </tr>

                <!-- <td v-if="game.players.length <= 1" colspan="2" class=" pt-5">
                  <v-data-table
                    class="mt-5"
                    loading
                    loading-text="Waiting for other users to join"
                    hide-default-footer
                  />
                </td> -->
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-card flat>
          <v-btn color="error" @click="refreshLobby">Refresh</v-btn>
          <v-btn
            :to="{ name: 'game-scorecard' /*, params: { path: path, id: getCurrentCourse.id*/ }"
            color="primary"
            class=""
            >Start Game</v-btn
          >
        </v-card>
        <v-card class="pa-1 overflow-x-auto">
          <pre class="mb-5">{{ $log(getGame) || getGame }}</pre>
        </v-card>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  import { mapGetters } from "vuex";
  import Store from "../store";
  export default {
    name: "lobby",
    data() {
      return {
        lobbyCode: "XYZQ",
        courseName: "Klabratún",
        currentUser: {
          userId: 3,
          userName: "Nigga Beinteins",
        },
        game: {},
      };
    },
    created() {
      //this.initialize();
      //TODO: Remove when the game object is ready
      // var indexOfOwner = this.getGame.players.items.findIndex(
      //   (o) => o.user.email === this.getGame.owner.email,
      // );
      // const ownerElement = this.getGame.players.items.splice(indexOfOwner, 1);
      // this.getGame.players.items = [...ownerElement, ...this.game.players.items];
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
    components: { Fragment },
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
