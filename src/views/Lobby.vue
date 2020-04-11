<template>
  <fragment>
    <v-app-bar color="primary" app>
      <v-toolbar-title>{{ courseName }}</v-toolbar-title>
      <v-spacer />
      <v-banner single-line>Code: {{ lobbyCode }}</v-banner>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left" colspan="2">Players</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in game.players" :key="player.id">
                  <td>
                    <fragment v-if="!index"><v-icon small>fa-crown</v-icon></fragment>
                    {{ player.userName }}
                  </td>
                  <td class="text-right"><v-icon>fa-minus-circle</v-icon></td>
                </tr>

                <td v-if="game.players.length <= 1" colspan="2" class=" pt-5">
                  <v-data-table
                    class="mt-5"
                    loading
                    loading-text="Waiting for other users to join"
                    hide-default-footer
                  />
                </td>
              </tbody>
            </v-simple-table>
            <v-card flat color="transparent">
              <v-card-actions>
                <v-btn :to="{ name: 'scorecard' }">Start Game</v-btn></v-card-actions
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  export default {
    name: "lobby",

    data() {
      return {
        lobbyCode: "XYZQ",
        courseName: "Folf völlurinn sprell",
        currentUserId: 1,
        currentUserName: "Siggi Hall",
        lobbyOwnerId: 4,
        lobbyOwnerName: "Nigga Beinteins",
        game: {},
      };
    },
    created() {
      this.initialize();
      var indexOfOwner = this.game.players.findIndex((o) => o.userId === this.game.ownerId);
      const ownerElement = this.game.players.splice(indexOfOwner, 1);
      this.game.players = [...ownerElement, ...this.game.players];
    },

    components: { Fragment },
    methods: {
      initialize() {
        this.game = {
          gameStatus: 0,
          lobbyId: 1,
          courseName: "Klabratun",
          ownerId: 3,
          players: [
            {
              userId: 1,
              userName: "Siggi Hall",
            },
            {
              userId: 2,
              userName: "Sigga Beinteins",
            },
            {
              userId: 3,
              userName: "Nigga Beinteins",
            },
            {
              userId: 4,
              userName: "Durgurinn",
            },
            {
              userId: 5,
              userName: "Rassi Prump",
            },
          ],
        };
      },
      kickUser(item) {
        const index = this.joinedUsers.indexOf(item);
        confirm("Are you sure you want to kick user?") && this.joinedUsers.splice(index, 1);
      },
    },

    //   <v-data-table
    //   v-if="joinedUsers.length === 1"
    //   loading
    //   loading-text="Waiting for players to join"
    //   hide-default-footer="true"
    //   mobile-breakpoint="320"
    // />
  };
</script>

<style scoped></style>
