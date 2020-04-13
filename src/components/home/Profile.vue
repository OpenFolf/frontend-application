<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="info" class="pa-1 overflow-x-auto">
          <v-btn text color="error" @click="seeDebug = !seeDebug" small>
            {{ seeDebug ? "Hide" : "Show Debug text" }}
          </v-btn>
          <pre v-if="seeDebug">{{ getUser }}</pre>
          <v-divider />
          <v-card-title class="headline">
            User Name: {{ getUserName ? getUserName : "--" }}
          </v-card-title>
          <v-text-field
            v-model="localUserName"
            @click:append="saveLocalUserName"
            append-icon="fa-save"
            outlined
            label="User Name"
            flat
            class="px-2"
          />
          <v-divider />
          <v-card class="pa-1 my-1 d-flex flex-column justify-center" color="transparent" flat>
            <v-card-title class="headline">Default Tee Color:</v-card-title>
            <v-btn-toggle mandatory v-model="localTeeValue" class="mb-2 mx-auto">
              <v-btn :value="0" text color="blue">blue</v-btn>
              <v-btn :value="1" text color="white">white</v-btn>
              <v-btn :value="2" text color="red">red</v-btn>
              <v-btn :value="3" text color="yellow">yellow</v-btn>
            </v-btn-toggle>
          </v-card>

          <v-divider />

          <v-card class="pa-1 my-1 d-flex flex-row align-center" color="transparent" flat>
            <v-card-title class="headline">Set Theme:</v-card-title>
            <v-spacer />
            <v-btn x-large @click="toggleTheme" class="mr-2">
              <v-icon left>fa-sun</v-icon>
              /
              <v-icon right>fa-moon</v-icon>
            </v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "home-profile",
    data() {
      return {
        localUserName: "",
        localTeeValue: 3,
        localColorLabel: "YELLOW",
        seeDebug: false,
      };
    },
    computed: {
      ...mapGetters(["getUser", "getUserName", "getUserTee"]),
    },
    methods: {
      ...mapActions(["setUserName", "setUserDefaultTee"]),
      saveLocalUserName() {
        this.setUserName(this.localUserName);
        this.localUserName = "";
      },
      // SECTION: TODO: .
      // This function should reside in the store or centralized logic.
      // Ideal would be to GET value and DISPATCH an action to toggle the theme settings.
      // Also this should be saved with the user object and set during initialization.
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        // this.$vuetify.theme.dark ? this.setUserTheme("DARK") : this.setUserTheme("LIGHT");
        // This set GLOBAL THEME WITH THE USER STORE.
      },
      // SECTION: TODO: .
    },
    watch: {
      localTeeValue() {
        switch (this.localTeeValue) {
          case 0:
            this.setUserDefaultTee("BLUE");
            break;
          case 1:
            this.setUserDefaultTee("WHITE");
            break;
          case 2:
            this.setUserDefaultTee("RED");
            break;
          case 3:
            this.setUserDefaultTee("YELLOW");
            break;
        }
      },
      localColorLabel: {
        immediate: true,
        handler() {
          let colorLabel = this.$store.getters.getUserTee;
          if (colorLabel === "BLUE") {
            this.localTeeValue = 0;
          } else if (colorLabel === "WHITE") {
            this.localTeeValue = 1;
          } else if (colorLabel === "RED") {
            this.localTeeValue = 2;
          } else {
            this.localTeeValue = 3;
          }
        },
      },
    },
  };
</script>
