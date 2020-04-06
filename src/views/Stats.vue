<template>
  <v-content>
    <v-card max-width="400" class="mx-auto">
      <v-card-title>STATS</v-card-title>
    </v-card>
  </v-content>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "stats",
    computed: {
      ...mapGetters(["signedIn"]),
    },
  };
</script>
