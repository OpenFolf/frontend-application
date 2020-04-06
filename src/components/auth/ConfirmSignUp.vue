<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="#41b883">
      <v-img
        class="mr-2"
        :src="require('@/assets/basket_white.png')"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>Confirm Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-Mail" v-model="localUserNameEmail" type="text" />
        <v-text-field label="Confirmation Code" type="text" v-model="confirmCode" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="confirm" color="#41b883">CONFIRM</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="resend">Lost the code? Resend code.</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="signIn">Back to Sign In.</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "confirm-sign-up",
    props: {
      userNameEmail: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        localUserNameEmail: "",
        confirmCode: "",
      };
    },
    methods: {
      confirm() {
        this.$Amplify.Auth.confirmSignUp(this.localUserNameEmail, this.confirmCode)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
          .catch((e) => console.log("error: ", e));
        // .catch((e) => this.setError(e));
      },
      resend() {
        this.$Amplify.Auth.resendSignUp(this.localUserNameEmail)
          .then(() => {
            console.log("Resend success");
          })
          .catch((e) => console.log("error: ", e));
        // .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
      },
      // setError(e) {
      //   this.error = this.$Amplify.I18n.get(e.message || e);
      // },
    },
    watch: {
      userNameEmail: {
        immediate: true,
        handler() {
          this.localUserNameEmail = this.userNameEmail;
        },
      },
    },
  };
</script>
