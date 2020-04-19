<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#00897B" flat>
          <v-card-title class="headline">
            Store value: {{ getUserLocation ? getUserLocation : "NO VALUE" }}
          </v-card-title>
          <v-divider />
          <v-card-title class="headline">Get Current Location</v-card-title>
          <v-btn @click="getLocation" block>Get location</v-btn>
          <v-card-text v-if="getUserLocation" class="font-weight-bold">
            Lat: {{ getUserLocation.lat }} - Lng: {{ getUserLocation.lng }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";
  import { getUserLocation } from "@/services";
  export default {
    name: "home-location",
    data() {
      return {
        lat: "-",
        lng: "-",
      };
    },
    methods: {
      getLocation() {
        getUserLocation();
      },
    },
    computed: {
      ...mapGetters(["getUserLocation"]),
    },
  };
</script>
