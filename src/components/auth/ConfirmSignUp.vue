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
      <v-form ref="confirmSignUpForm" v-model="valid" lazy-validation>
        <v-text-field
          label="E-Mail"
          type="email"
          :rules="emailRules"
          v-model="localUserNameEmail"
          required
        />
        <v-text-field
          label="Confirmation Code"
          v-model="confirmCode"
          :rules="confirmRules"
          type="text"
          required
        />
        <v-btn block :disable="!valid" @click="confirm" color="#41b883">CONFIRM</v-btn>
      </v-form>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer />
      <v-btn :disable="!valid" @click="confirm" color="#41b883">CONFIRM</v-btn>
      <v-spacer />
    </v-card-actions> -->
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
    <v-alert
      dense
      border="top"
      colored-border
      close-text="Dismiss"
      dismissible
      v-model="isError"
      elevation="0"
      class="py-5"
    >
      {{ errorObj }}
    </v-alert>
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
        errorObj: "",
        isError: false,
        valid: true,
        confirmRules: [
          (v) => !!v || "Confirmation Code is required",
          (v) => (v && v.length === 6) || "Confirmation Code must be 6 characters",
        ],
        localUserNameEmail: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      };
    },
    mounted() {
      this.$nextTick(function() {
        this.valid = false;
        // this.validate();
      });
    },
    methods: {
      confirm() {
        this.$Amplify.Auth.confirmSignUp(this.localUserNameEmail, this.confirmCode)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
          .catch((e) => this.setError(e));
      },
      resend() {
        this.$Amplify.Auth.resendSignUp(this.localUserNameEmail)
          .then(() => {
            console.log("Resend success");
          })
          .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
      },
      setError(e) {
        this.errorObj = this.$Amplify.I18n.get(e.message || e);
        this.isError = true;
        // console.log("isError: ", this.isError);
        // console.log("setError: ", e);
      },
      validate() {
        this.$refs.confirmSignUpForm.validate();
      },
      reset() {
        this.$refs.confirmSignUpForm.reset();
      },
      resetValidation() {
        this.$refs.confirmSignUpForm.resetValidation();
      },
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
