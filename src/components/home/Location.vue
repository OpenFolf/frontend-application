<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#00897B" flat>
          <v-card-title class="headline">Store value: {{ storeLocationValue }}</v-card-title>
          <v-card-title class="headline"> LocalStore Value: {{ localLocationValue }} </v-card-title>
          <v-divider />
          <v-card-title class="headline">Get Current Location</v-card-title>
          <v-btn @click="getLocation" block>Get location</v-btn>
          <v-card-text class="font-weight-bold">Lat: {{ lat }} - Lng: {{ lng }} </v-card-text>
          <v-card-text v-if="errorMsg" class="font-weight-bold">
            errorHandler: {{ errorMsg }}
          </v-card-text>
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
        storeLocationValue: "'Not Connected'",
        errorMsg: "",
        lat: "-",
        lng: "-",
      };
    },
    methods: {
      getLocation() {
        const that = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(displayLocationInfo, errorHandler);
        }

        function displayLocationInfo(position) {
          // TODO: Here there should be a call to the store.
          that.lat = position.coords.latitude;
          that.lng = position.coords.longitude;
        }

        function errorHandler(error) {
          // If there is some kind of error thrown it will be caught here.
          that.errorMsg = error.message;
        }
      },
    },
  };
</script>
