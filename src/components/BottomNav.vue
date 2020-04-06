<template>
  <v-bottom-navigation app shift height="62" background-color="#41b883">
    <v-btn x-large :to="{ name: 'home' }" color="#41b883">
      <span class="mt-1">Home</span>
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn x-large :to="{ name: 'new-game' }" color="#41b883">
      <span class="mt-1">New Game</span>
      <v-icon>fa-play</v-icon>
    </v-btn>

    <v-btn x-large :to="{ name: 'join-game' }" color="#41b883">
      <span class="mt-1">Join Game</span>
      <v-icon>fa-compress-alt</v-icon>
    </v-btn>

    <v-btn x-large :to="{ name: 'stats' }" color="#41b883">
      <span class="mt-1">Stats</span>
      <v-icon>fa-chart-bar</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
  export default {
    name: "bottom-nav",
  };
</script>
