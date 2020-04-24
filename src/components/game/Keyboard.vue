<template>
  <v-app-bar class="d-flex justify-center align-center" height="180px" bottom app>
    <v-card flat color="primary" width="100%" class="">
      <v-card-title class="font-weight-bold headline">
        <!-- {{ getPlayers[selectedPlayer].user.username }} -->
        hole nr.
        <!-- {{ selectedHole + 1 }} -->
        <v-spacer />
        <v-btn-toggle color="accent" v-model="zigZag" mandatory dense>
          <v-btn depressed>
            <v-icon>fa-long-arrow-alt-down</v-icon>
          </v-btn>
          <v-btn depressed>
            <v-img :src="require('@/assets/zigzagprimary.png')" height="25" width="25" contain />
          </v-btn>
        </v-btn-toggle>
      </v-card-title>
      <v-card-actions>
        <v-btn class="font-weight-bold headline" depressed>0</v-btn>
        <v-btn class="font-weight-bold headline" depressed>1</v-btn>
        <v-btn class="font-weight-bold headline" depressed>2</v-btn>
        <v-btn class="font-weight-bold headline" depressed>3</v-btn>
        <v-btn class="font-weight-bold headline" depressed>4</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn class="font-weight-bold headline" depressed>5</v-btn>
        <v-btn class="font-weight-bold headline" depressed>6</v-btn>
        <v-btn class="font-weight-bold headline" depressed>7</v-btn>
        <v-btn class="font-weight-bold headline" depressed>8</v-btn>
        <v-btn class="font-weight-bold headline" depressed>9</v-btn>
      </v-card-actions>
    </v-card>
  </v-app-bar>
</template>

<script>
  export default {
    name: "scorecard-keyboard",
  };
</script>
