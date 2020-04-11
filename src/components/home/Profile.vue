<template>
  <!-- <v-card flat color="transparent">
    <v-card-title>
      Set Theme
      <v-spacer />
      <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
    </v-card-title>
    <v-card-actions>
    </v-card-actions>
  </v-card> -->
  <v-card flat color="transparent">
    <!-- <p>{{ getUser }}</p> -->
    <v-text-field label="Display Name" solo flat height="5px" v-model="displayName" />
    <v-text-field label="Initials" solo flat height="5px" v-model="displayInitials" />
    Set Theme
    <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
  </v-card>
</template>

<script>
  // import { mapGetters } from "vuex";
  export default {
    name: "home-profile",
    // computed: {
    //   ...mapGetters(["getUser"]),
    // },
    data() {
      return {
        displayName: "",
        displayInitials: "",
        isDark: true,
        toggle_multiple: [0, 1, 2],
      };
    },
  };
</script>
