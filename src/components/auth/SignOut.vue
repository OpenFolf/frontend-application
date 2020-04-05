<template>
  <v-btn @click="signOutAWS" class="my-5" color="#41b883">SIGN OUT</v-btn>
</template>

<script>
  import { mapActions } from "vuex";
  import { AmplifyEventBus } from "aws-amplify-vue";
  export default {
    name: "options",
    methods: {
      ...mapActions(["signOut"]),
      signOutAWS() {
        this.$Amplify.Auth.signOut()
          .then(() => {
            return AmplifyEventBus.$emit("authState", "signedOut");
          })
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
