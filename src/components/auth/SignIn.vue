<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat v-if="!getSignedIn">
    <v-toolbar color="primary" flat>
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
          @click="signInUser"
          color="primary"
          >SIGN IN
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="this.SIGN_UP">No account? Create one!</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="this.RESET_PASSWORD">Forgot your password? Reset Password.</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import { required, email, minLength } from "vuelidate/lib/validators";

  export default {
    name: "sign-in",
    data() {
      return {
        email: "",
        password: "",
        showPassword: false,
      };
    },
    methods: {
      ...mapActions([
        "signIn",
        "setSignedIn",
        "setUserAuthObject",
        "setUserId",
        "fetchUser",
        "fetchCourseList",
      ]),
      ...mapMutations([
        "SIGN_UP",
        "LOG_IN",
        "RESET_PASSWORD",
        "CONFIRM_SIGN_UP",
        "ERROR_MSG",
        "CLEAR_ERRORS",
      ]),
      signInUser() {
        this.signIn({ email: this.email, password: this.password });
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
      ...mapGetters(["getSignedIn", "errorMsg", "authState"]),
      emailErrors() {
        console.log("SignIn>EmailErrors", this.errorMsg);
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
