<template>
  <v-card max-width="505px" class="pa-5 mx-auto" color="#4E4E4E">
    <sign-in v-if="!signedIn && signIn" @authState="authHandler" />
    <sign-up v-if="!signedIn && signUp" @authState="authHandler" />

    <!-- TODO - pass the user email to the component -->
    <confirm-sign-up
      v-if="!signedIn && confirmSignUp"
      :user="userNameEmail"
      @authState="authHandler"
    />
    <reset-password
      v-if="!signedIn && resetPassword"
      :user="userNameEmail"
      @authState="authHandler"
    />

    <div :style="signOutObject" v-if="signedIn">
      <sign-out />
    </div>
  </v-card>
</template>

<script>
  import SignIn from "@/components/auth/SignIn.vue";
  import SignUp from "@/components/auth/SignUp.vue";
  import ConfirmSignUp from "@/components/auth/ConfirmSignUp.vue";
  import ResetPassword from "@/components/auth/ResetPassword.vue";
  import SignOut from "@/components/auth/SignOut.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "authenticator",
    components: {
      SignIn,
      SignUp,
      ConfirmSignUp,
      ResetPassword,
      SignOut,
    },
    data() {
      return {
        userNameEmail: "",
        signIn: true,
        signUp: false,
        confirmSignUp: false,
        resetPassword: false,
        signOutObject: {
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          alignItems: "center",
        },
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
      ...mapGetters(["signedIn"]),
    },
  };
</script>
