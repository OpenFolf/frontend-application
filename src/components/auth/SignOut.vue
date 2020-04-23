<template>
  <v-btn @click="signOutUser" small color="error">
    <v-icon class="mx-0">fa-sign-out-alt</v-icon>
  </v-btn>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "sign-out",
    methods: {
      ...mapActions(["resetAuth"]),
      signOutUser() {
        this.resetAuth();
      },
    },
  };
</script>
