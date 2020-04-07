<template>
  <vue-fragment>
    <v-app-bar color="primary" app>
      <v-toolbar-title>{{ courseName }}</v-toolbar-title>
      <v-spacer />
      <v-banner single-line :sticky="sticky">Code: {{ lobbyCode }}</v-banner>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left" colspan="2">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in joinedUsers" :key="user.id">
                  <td><v-icon v-if="user.owner">fa-crown</v-icon> {{ user.userName }}</td>
                  <td class="text-right"><v-icon>fa-minus-circle</v-icon></td>
                </tr>
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
  </vue-fragment>
</template>

<script>
  export default {
    name: "lobby",

    data() {
      return {
        lobbyCode: "XYZQ",
        courseName: "Folf völlurinn sprell",
        currentUserId: 1,
        currentUserName: "Siggi Hall",
        lobbyOwnerId: 1,
        lobby: {
          lobbyid: 1,
          courseName: "Klabrat'un",
          ownerId: 1,
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
        },
      };
    },
    created() {
      this.initialize();
    },

    methods: {
      initialize() {
        this.joinedUsers = [
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
        ];
      },
      kickUser(item) {
        const index = this.joinedUsers.indexOf(item);
        confirm("Are you sure you want to kick user?") && this.joinedUsers.splice(index, 1);
      },
    },
  };

  //   <v-data-table
  //   v-if="joinedUsers.length === 1"
  //   loading
  //   loading-text="Waiting for players to join"
  //   hide-default-footer="true"
  //   mobile-breakpoint="320"
  // />
</script>

<style scoped></style>
