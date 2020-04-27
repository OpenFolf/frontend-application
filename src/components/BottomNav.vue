<template>
  <v-bottom-navigation
    class="d-flex justify-space-around align-center"
    app
    dark
    shift
    background-color="primary"
  >
    <v-btn :to="{ name: 'home-menu' }">
      <span class="mt-3">Home</span>
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'game' }">
      <span class="mt-3">Game</span>
      <v-icon>fa-play</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'join-game' }">
      <span class="mt-3">Join Game</span>
      <v-icon>fa-compress-alt</v-icon>
    </v-btn>

    <v-btn :to="{ name: 'stats' }">
      <span class="mt-3">Stats</span>
      <v-icon>fa-chart-bar</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: "bottom-nav",
  };
</script>
