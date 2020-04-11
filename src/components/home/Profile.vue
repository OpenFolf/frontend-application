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
    <v-text-field label="Display Name" solo flat height="5px" v-model="displyName" />
    <v-text-field label="Initials" solo flat height="5px" v-model="displayInitials" />
    Set Theme
    <v-switch flat v-model="isDark" append-icon="fa-sun" prepend-icon="fa-moon" />
  </v-card>
</template>

<script>
  export default {
    name: "home-profile",
    data() {
      return {
        toggle_multiple: [0, 1, 2],
      };
    },
  };
</script>
