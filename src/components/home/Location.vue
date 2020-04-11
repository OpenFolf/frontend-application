<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#00897B">
          <v-card-title class="headline">Location value:</v-card-title>
          <v-card-text class="font-weight-bold">{{ locationValue }} </v-card-text>
          <v-divider />
          <v-card-title class="headline">Get Current Location</v-card-title>
          <v-btn block>Get location</v-btn>
          <v-card-text class="font-weight-bold">{{ locationObj }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "home-location",
    data() {
      return {
        locationValue: "'none'",
        locationObj: {
          lat: null,
          lng: null,
        },
      };
    },
  };
</script>
