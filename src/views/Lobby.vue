<template>
  <fragment>
    <v-app-bar color="primary" app>
      <v-toolbar-title>{{ courseName }}</v-toolbar-title>
      <v-spacer />
      <v-banner single-line>Code: {{ lobbyCode }}</v-banner>
    </v-app-bar>
    <v-content>
      <v-container fluid fill-height class="justify-center">
        <v-row class="col-12">
          <v-col class="col-12 align-content-space-between">
            <v-simple-table>
              <thead class="header">
                <tr>
                  <th class="text-left title" colspan="2">Players</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, index) in game.players" :key="player.id">
                  <td>
                    <fragment v-if="!index"
                      ><v-icon small color="warning" class="mr-2">fa-crown</v-icon></fragment
                    >
                    {{ player.userName }}
                  </td>
                  <td class="text-right">
                    <fragment v-if="index && currentUser.userId !== player.userId">
                      <v-icon color="error" small>fa-minus-circle</v-icon>
                    </fragment>
                  </td>
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
          </v-col>
        </v-row>
        <v-card flat>
          <v-btn :to="{ name: 'scorecard' }" color="primary" class="">Start Game</v-btn>
        </v-card>
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

        courseName: "Klabratún",
        currentUser: {
          userId: 3,
          userName: "Nigga Beinteins",
        },

        game: {},
      };
    },
    created() {
      this.initialize();

      var indexOfOwner = this.game.players.findIndex((o) => o.userId === this.game.owner.useId);
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

          owner: {
            userId: 3,
            userName: "Nigga Beinteins",
          },

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
  };
</script>

<style scoped>
  .header {
    background-color: var(--v-secondary-lighten1);
  }
</style>
