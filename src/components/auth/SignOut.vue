<template>
  <v-btn @click="signOutAWS" class="my-5" color="#41b883">SIGN OUT</v-btn>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    name: "sign-out",
    methods: {
      ...mapActions(["signOut"]),
      signOutAWS() {
        this.$Amplify.Auth.signOut()
          .then(() => {
            this.signOut();
          })
          .catch((e) => this.setError(e));
      },
      setError: function(e) {
        console.log("error", e);
      },
    },
  };
</script>
