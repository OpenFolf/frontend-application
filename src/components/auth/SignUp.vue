<template>
  <v-card outlined width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary" flat>
      <v-toolbar-title class="white--text">Sign Up</v-toolbar-title>
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
          @keyup.enter="signUpUser"
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
          @click="signUpUser"
        >
          <span class="font-weight-bold">Sign Up</span>
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="this.SIGN_IN">Already have an account? Sign In!</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
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
      ...mapActions(["signUp"]),
      ...mapMutations(["SIGN_IN", "SIGN_UP", "CONFIRM_SIGN_UP", "ERROR_MSG", "CLEAR_ERRORS"]),
      signUpUser() {
        this.signUp({
          attributes: { email: this.email },
          username: this.email,
          password: this.password,
        });
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
    created() {
      this.email = this.authState.email;
    },
    computed: {
      ...mapGetters(["errorMsg", "authState"]),
      emailErrors() {
        const errors = [];
        if (this.errorMsg.message) {
          errors.push(this.errorMsg.message);
          this.CLEAR_ERRORS();
          return errors;
        }
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
        if (this.errorMsg.message) this.CLEAR_ERRORS();
        return errors;
      },
    },
  };
</script>
