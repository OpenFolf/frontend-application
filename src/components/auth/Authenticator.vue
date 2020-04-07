<template>
  <v-card class="pa-5 mx-auto" color="transparent" flat>
    <sign-in
      v-if="!getSignedIn && signIn"
      @authState="authHandler"
      :userNameEmail="userNameEmail"
    />
    <sign-up v-if="!getSignedIn && signUp" @authState="authHandler" />
    <confirm-sign-up
      v-if="!getSignedIn && confirmSignUp"
      @authState="authHandler"
      :userNameEmail="userNameEmail"
    />
    <reset-password
      v-if="!getSignedIn && resetPassword"
      @authState="authHandler"
      :userNameEmail="userNameEmail"
    />
  </v-card>
</template>

<script>
  import SignIn from "@/components/auth/SignIn.vue";
  import SignUp from "@/components/auth/SignUp.vue";
  import ConfirmSignUp from "@/components/auth/ConfirmSignUp.vue";
  import ResetPassword from "@/components/auth/ResetPassword.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "authenticator",
    components: {
      SignIn,
      SignUp,
      ConfirmSignUp,
      ResetPassword,
    },
    data() {
      return {
        userNameEmail: "",
        signIn: true,
        signUp: false,
        confirmSignUp: false,
        resetPassword: false,
      };
    },
    methods: {
      authHandler(e) {
        if (e.msg == "signUp") {
          this.signIn = false;
          this.signUp = true;
          this.confirmSignUp = false;
          this.resetPassword = false;
        } else if (e.msg == "forgotPassword") {
          this.signIn = false;
          this.signUp = false;
          this.confirmSignUp = false;
          this.resetPassword = true;
          this.userNameEmail = e.username;
        } else if (e.msg == "signIn") {
          this.signIn = true;
          this.signUp = false;
          this.confirmSignUp = false;
          this.resetPassword = false;
          this.userNameEmail = e.username;
        } else if (e.msg == "confirmSignUp") {
          this.signIn = false;
          this.signUp = false;
          this.confirmSignUp = true;
          this.resetPassword = false;
          this.userNameEmail = e.username;
        }
      },
    },
    computed: {
      ...mapGetters(["getSignedIn"]),
    },
  };
</script>
