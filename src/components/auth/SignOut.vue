<template>
  <v-btn @click="signOut" class="my-5" color="#41b883">SIGN OUT</v-btn>
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
