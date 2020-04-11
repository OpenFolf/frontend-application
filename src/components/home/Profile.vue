<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="#00897B">
          <v-card-title class="headline">User Name:</v-card-title>
          <v-text-field solo flat v-model="localUserName" />
          <v-divider />
          <v-card-title class="headline">Default Tee Color::</v-card-title>
          <v-btn-toggle>
            <v-btn>blue</v-btn>
            <v-btn>white</v-btn>
            <v-btn>red</v-btn>
            <v-btn>yellow</v-btn>
          </v-btn-toggle>
          <v-divider />
          <v-card-title class="headline">Set Theme:</v-card-title>
          <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <v-card flat color="transparent">
    <v-card-title>
      Set Theme
      <v-spacer />
      <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
    </v-card-title>
    <v-card-actions>
    </v-card-actions>
  </v-card> -->
  <!-- <v-card flat color="transparent">
    <p>{{ getUser }}</p>
    <v-text-field label="Display Name" solo flat height="5px" v-model="displayName" />
    <v-text-field label="Initials" solo flat height="5px" v-model="displayInitials" />
    Set Theme
    <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
  </v-card> -->
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    name: "home-profile",
    computed: {
      ...mapGetters(["getUser"]),
    },
    data() {
      return {
        localUserName: "",
        isDark: true,
      };
    },
  };
</script>
