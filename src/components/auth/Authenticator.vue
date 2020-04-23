<template>
  <v-card class="pa-5" color="transparent" flat>
    <sign-in v-if="!signedIn && this.authState.path == 'signIn'" />
    <sign-up v-if="!signedIn && this.authState.path == 'signUp'" />
    <confirm-sign-up v-if="!signedIn && this.authState.path == 'confirmSignUp'" />
    <reset-password v-if="!signedIn && this.authState.path == 'resetPassword'" />
  </v-card>
</template>

<script>
  import SignIn from "@/components/auth/SignIn.vue";
  import SignUp from "@/components/auth/SignUp.vue";
  import ConfirmSignUp from "@/components/auth/ConfirmSignUp.vue";
  import ResetPassword from "@/components/auth/ResetPassword.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "authenticator",
    components: {
      SignIn,
      SignUp,
      ConfirmSignUp,
      ResetPassword,
    },
    computed: {
      ...mapGetters(["signedIn", "authState"]),
    },
    methods: {
      ...mapActions(["inGameRouting"]),
    },
    watch: {
      signedIn() {
        this.inGameRouting();
      },
    },
  };
</script>
