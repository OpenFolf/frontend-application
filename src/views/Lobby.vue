<template>
  <div>
    <h1>Lobby</h1>
    <h4>Code: {{ lobbyCode }}</h4>
    <br />
    <h3>Course: {{ courseName }}</h3>
    <br />
    <h5>User hosting the lobby: {{ currentUserName }}</h5>
    <br />
    <h5>List of users that joined the game</h5>
    <ul v-for="joinedUser in joinedUsers" :key="joinedUser.userId">
      <li>{{ joinedUser.userName }}</li>
    </ul>
    <br />
    <v-btn :to="{ name: 'scorecard' }">Start Game</v-btn>
  </div>
</template>

<script>
  export default {
    name: "lobby",

    data() {
      return {
        lobbyCode: "XYZQ",
        courseName: "Folf völlurinn sprell",
        currentUserName: "Siggi Hall",
        joinedUsers: [
          {
            userId: 1,
            userName: "Skari Skrípó",
          },
          {
            userId: 2,
            userName: "Siggi Hall",
          },
        ],
      };
    },
  };
</script>

<style scoped></style>
