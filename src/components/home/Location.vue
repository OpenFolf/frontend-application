<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#00897B">
          <v-card-title class="headline">Store value: {{ storeLocationValue }}</v-card-title>
          <v-card-title class="headline"> LocalStore Value: {{ localLocationValue }} </v-card-title>
          <v-btn @click="pingLocation" block>Ping navigator.geolocation</v-btn>
          <v-divider />
          <v-card-title class="headline">Get Current Location</v-card-title>
          <v-btn @click="getLocation" block>Get location</v-btn>
          <v-card-text class="font-weight-bold">Lat: {{ lat }} - Lng: {{ lng }} </v-card-text>
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
        storeLocationValue: "'none'",
        localLocationValue: "",
        lat: "null",
        lng: "null",
      };
    },
    methods: {
      pingLocation() {
        // this.localLocationValue = navigator.geolocation;
        console.log(navigator.geolocation);
      },
      getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(displayLocationInfo);
        }

        function displayLocationInfo(position) {
          // TODO: Here there should be a call to the store.
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
    },
  };
</script>
