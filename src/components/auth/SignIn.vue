<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat v-if="!getSignedIn">
    <v-toolbar color="primary">
      <v-toolbar-title>Sign In</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="signInForm">
        <v-text-field
          label="E-Mail"
          type="email"
          @change="$v.email.$touch()"
          @blur="$v.email.$touch()"
          :error-messages="emailErrors"
          v-model="email"
          required
        />

        <v-text-field
          label="Password"
          v-model="password"
          @change="$v.password.$touch()"
          @blur="$v.password.$touch()"
          :error-messages="passwordErrors"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="signIn"
          required
        />

        <v-btn
          block
          :disabled="$v.email.$invalid || $v.password.$invalid"
          @click="signIn"
          color="primary"
          >SIGN IN
        </v-btn>
      </v-form>
    </v-card-text>
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
      color="error"
    >
      {{ errorObj }}
    </v-alert>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { required, email, minLength } from "vuelidate/lib/validators";
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
        email: "",
        password: "",
        showPassword: false,
        errorObj: "",
        isError: false,
      };
    },

    methods: {
      ...mapActions([
        "setSignedIn",
        "setUserAuthObject",
        "setUserId",
        "fetchUser",
        "fetchCourseList",
      ]),
      signIn() {
        this.$Amplify.Auth.signIn(this.email, this.password)
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
                this.fetchCourseList();
              })
              .catch((e) => this.setError(e));
          })
          .then(() => {
            this.$refs.signInForm.reset();
          })
          .catch((e) => {
            if (e.code && e.code === "UserNotConfirmedException") {
              this.$emit("authState", { msg: "confirmSignUp", username: this.email });
            } else {
              this.setError(e);
            }
          });
      },
      signUp() {
        this.$emit("authState", { msg: "signUp" });
      },
      forgot() {
        this.$emit("authState", { msg: "forgotPassword", username: this.email });
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
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    computed: {
      ...mapGetters(["getSignedIn"]),
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail");
        !this.$v.email.required && errors.push("E-mail is required");
        return errors;
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength && errors.push("Password must be at least 8 characters long");
        !this.$v.password.required && errors.push("Password is required.");
        return errors;
      },
    },
    watch: {
      userNameEmail: {
        immediate: true,
        handler() {
          this.email = this.userNameEmail;
        },
      },
    },
  };
</script>
