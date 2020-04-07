<template>
  <v-bottom-navigation
    class="d-flex justify-space-around align-center"
    app
    shift
    background-color="#41b883"
  >
    <v-btn :to="{ name: 'home' }" color="#41b883">
      <span class="mt-2">Home</span>
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'game' }" color="#41b883">
      <span class="mt-2">New Game</span>
      <v-icon>fa-play</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'join-game' }" color="#41b883">
      <span class="mt-2">Join Game</span>
      <v-icon>fa-compress-alt</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'stats' }" color="#41b883">
      <span class="mt-2">Stats</span>
      <v-icon>fa-chart-bar</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: "bottom-nav",
  };
</script>
