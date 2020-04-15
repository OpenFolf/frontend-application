<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary">
      <v-toolbar-title>Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <p class="text-center text--white font-weight-bold">Your E-Mail will be your User Name.</p>
      <v-form ref="signUpForm">
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
          required
        />
        <v-btn
          block
          color="primary"
          :disabled="$v.email.$invalid || $v.password.$invalid"
          @click="signUp"
          >Sign Up</v-btn
        >
      </v-form>
    </v-card-text>
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
      color="error"
    >
      {{ errorObj }}
    </v-alert>
  </v-card>
</template>

<script>
  import { required, email, minLength } from "vuelidate/lib/validators";
  export default {
    name: "sign-up",
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
      signUp() {
        this.$Amplify.Auth.signUp({
          attributes: { email: this.email },
          username: this.email,
          password: this.password,
        })
          .then((data) => {
            if (data.userConfirmed === false) {
              return this.$emit("authState", {
                msg: "confirmSignUp",
                username: this.email,
              });
            }
            return this.$emit("authState", { msg: "signIn", username: this.email });
          })
          .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.email });
      },
      setError(e) {
        this.errorObj = this.$Amplify.I18n.get(e.message || e);
        this.isError = true;
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
  };
</script>
