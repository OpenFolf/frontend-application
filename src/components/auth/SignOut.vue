<template>
  <v-btn @click="signOut" small color="error">
    <v-icon class="mx-0">fa-sign-out-alt</v-icon>
  </v-btn>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "sign-out",
    methods: {
      ...mapActions(["setSignOut"]),
      signOut() {
        this.$Amplify.Auth.signOut()
          .then(() => {
            this.setSignOut();
          })
          .catch((e) => console.log("error", e));
        // .catch((e) => this.setError(e));
      },
      // setError: function(e) {
      //   console.log("error", e);
      // },
    },
  };
</script>
