<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="primary">
      <v-toolbar-title>Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <p class="text-center text--white font-weight-bold">Your E-Mail will be your User Name.</p>
      <v-form ref="signUpForm" v-model="valid" lazy-validation>
        <v-text-field
          label="E-Mail"
          type="email"
          :rules="emailRules"
          v-model="localUserNameEmail"
          required
        />
        <v-text-field
          label="Password"
          v-model="password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword = !showPassword"
          required
        />
        <v-btn block :disabled="!valid" @click="signUp" color="#41b883">Sign Up</v-btn>
      </v-form>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer />
<<<<<<< HEAD
      <v-btn @click="signUp" color="primary">Sign Up</v-btn>
=======
      <v-btn :disabled="!valid" @click="signUp" color="#41b883">Sign Up</v-btn>
>>>>>>> f7a4cbf1a2c93e762502fd72081cf145db8155d4
      <v-spacer />
    </v-card-actions> -->
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="signIn">Already have an account? Sign In!</v-btn>
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
    name: "sign-up",
    data() {
      return {
        showPassword: false,
        errorObj: "",
        isError: false,
        valid: true,
        password: "",
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length > 6) || "Password must be longer than 6 characters",
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
      signUp() {
        this.$Amplify.Auth.signUp({
          attributes: { email: this.localUserNameEmail },
          username: this.localUserNameEmail,
          password: this.password,
        })
          .then((data) => {
            if (data.userConfirmed === false) {
              return this.$emit("authState", {
                msg: "confirmSignUp",
                username: this.localUserNameEmail,
              });
            }
            return this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
          // .catch((e) => console.log("error: ", e));
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
        this.$refs.signUpForm.validate();
      },
      reset() {
        this.$refs.signUpForm.reset();
      },
      resetValidation() {
        this.$refs.signUpForm.resetValidation();
      },
    },
  };
</script>
