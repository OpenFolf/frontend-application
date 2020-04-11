<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" v-if="!getSignedIn">
    <v-toolbar color="primary">
      <v-toolbar-title>Sign In</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="signInForm" v-model="valid" lazy-validation>
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
          @keyup.enter="signIn"
          required
        />
        <v-btn block :disabled="!valid" @click="signIn" color="Primary">SIGN IN</v-btn>
      </v-form>
    </v-card-text>
    <!-- <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!valid" @click="signIn" color="primary">SIGN IN</v-btn>
      <v-spacer />
    </v-card-actions> -->
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="signUp">No account? Create one!</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="forgot">Forgot your password? Reset Password.</v-btn>
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
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "sign-in",
    props: {
      userNameEmail: {
        type: String,
        required: false,
        default: "",
      },
    },
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
      ...mapActions(["setSignedIn", "setUserAuthObject", "setUserId", "fetchUser"]),
      signIn() {
        this.$Amplify.Auth.signIn(this.localUserNameEmail, this.password)
          .then(() => {
            this.setSignedIn(true);
            this.$Amplify.Auth.currentAuthenticatedUser()
              .then((data) => {
                if (data && data.signInUserSession) {
                  this.setUserAuthObject(data);
                  this.setUserId(data.username);
                }
              })
              .then(() => {
                this.fetchUser();
              })
              .catch((e) => this.setError(e));
          })
          .then(() => {
            this.$refs.signInForm.reset();
          })
          .catch((e) => {
            if (e.code && e.code === "UserNotConfirmedException") {
              this.$emit("authState", { msg: "confirmSignUp", username: this.localUserNameEmail });
            } else {
              this.setError(e);
            }
          });
      },
      signUp() {
        this.$emit("authState", { msg: "signUp" });
      },
      forgot() {
        this.$emit("authState", { msg: "forgotPassword", username: this.localUserNameEmail });
      },
      setError(e) {
        this.errorObj = this.$Amplify.I18n.get(e.message || e);
        this.isError = true;
      },
      validate() {
        this.$refs.signInForm.validate();
      },
      reset() {
        this.$refs.signInForm.reset();
      },
      resetValidation() {
        this.$refs.signInForm.resetValidation();
      },
    },
    computed: {
      ...mapGetters(["getSignedIn"]),
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
