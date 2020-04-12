<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="info" class="pa-1">
          <p>{{ getUser }}</p>
          <v-card-title class="headline">
            User Name: {{ getUsername ? getUsername : "--" }}
          </v-card-title>
          <v-text-field
            @click:append="saveLocalUserName"
            append-icon="fa-save"
            outlined
            label="User Name"
            flat
            v-model="localUserName"
            class="px-2"
          />
          <v-divider />
          <v-card class="pa-1 my-1 d-flex flex-column justify-center" color="transparent" flat>
            <v-card-title class="headline">Default Tee Color:</v-card-title>
            <v-btn-toggle mandatory v-model="teeColor" class="mb-2 mx-auto">
              <v-btn :value="0" text color="blue">blue</v-btn>
              <v-btn :value="1" text color="white">white</v-btn>
              <v-btn :value="2" text color="red">red</v-btn>
              <v-btn :value="3" text color="yellow">yellow</v-btn>
            </v-btn-toggle>
          </v-card>
          <p>tee color: {{ teeColor }}</p>
          <p>tee label: {{ getUserTee }}</p>
          <v-divider />
          <v-card class="pa-1 my-1 d-flex flex-row align-center" color="transparent" flat>
            <v-card-title class="headline">Set Theme:</v-card-title>
            <v-spacer />
            <v-btn @click="toggleTheme" class="pa-5 mr-2">
              <v-icon left>fa-sun</v-icon>
              /
              <v-icon right>fa-moon</v-icon>
            </v-btn>
            <!-- <v-switch flat v-model="toggleTheme" append-icon="fa-moon" prepend-icon="fa-sun" /> -->
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
        teeColor: 2,
        colorLabel: "",
      };
    },
    computed: {
      ...mapGetters(["getUser", "getUsername", "getUserTee"]),
    },
    methods: {
      ...mapActions(["setUserName", "setUserTheme", "setUserTee"]),
      saveLocalUserName() {
        this.setUserName(this.localUserName);
      },
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$vuetify.theme.dark ? this.setUserTheme("DARK") : this.setUserTheme("LIGHT");
        // This set GLOBAL THEME WITH THE USER STORE.
      },
    },
    watch: {
      teeColor() {
        switch (this.teeColor) {
          case 0:
            this.setUserTee("BLUE");
            break;
          case 1:
            this.setUserTee("WHITE");
            break;
          case 2:
            this.setUserTee("RED");
            break;
          case 3:
            this.setUserTee("YELLOW");
            break;
        }
      },
    },
  };
</script>
