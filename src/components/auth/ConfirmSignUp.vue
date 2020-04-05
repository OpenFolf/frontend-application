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
      <v-toolbar-title>openFOLF - Confirm Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <!-- TODO: Not sure what is in the first text field -->
        <v-text-field :label="userNameEmail" type="text" />
        <v-text-field label="Confirmation Code" type="text" v-model="confirmCode" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="cofirm" color="#41b883">CONFIRM</v-btn>
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
        confirmCode: "",
      };
    },
    methods: {
      confirm() {
        this.$Amplify.Auth.confirmSignUp(this.userNameEmail, this.confirmCode)
          .then(() => {
            this.$emit("authState", { msg: "signIn" });
          })
          // .catch((e) => this.setError(e));
          .catch((e) => console.log(e));
      },
      resend() {
        this.$Amplify.Auth.resendSignUp(this.userNameEmail)
          .then(() => {
            // this.logger.info("resendSignUp success");
            console.log("Resend success");
          })
          // .catch((e) => this.setError(e));
          .catch((e) => console.log(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn" });
      },
      // setError(e) {
      //   this.error = this.$Amplify.I18n.get(e.message || e);
      // },
    },
  };
</script>
