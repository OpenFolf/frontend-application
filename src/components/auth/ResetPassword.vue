<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary">
      <v-toolbar-title>Reset Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="resetPasswordForm">
        <v-text-field
          label="E-Mail"
          type="email"
          @change="$v.email.$touch()"
          @blur="$v.email.$touch()"
          :error-messages="emailErrors"
          v-model="email"
          required
        />
        <template v-if="isSentCode">
          <v-text-field
            label="Code"
            v-model="code"
            @change="$v.code.$touch()"
            @blur="$v.code.$touch()"
            :error-messages="codeErrors"
            type="number"
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
        </template>
        <template v-if="!isSentCode">
          <v-btn block :disabled="$v.email.$invalid" @click="submit" color="primary"
            >Send Code</v-btn
          >
        </template>
        <template v-if="isSentCode">
          <v-btn block :disabled="$v.code.$invalid" @click="verify" color="primary">Submit</v-btn>
        </template>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <template v-if="!isSentCode">
        <v-btn x-small text @click="signIn">Back to Sign In.</v-btn>
      </template>
      <template v-if="isSentCode">
        <v-btn x-small text @click="submit">Resend code</v-btn>
      </template>
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
  import { required, email, minLength, decimal } from "vuelidate/lib/validators";
  export default {
    name: "reset-password",
    props: {
      userNameEmail: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        email: "",
        password: "",
        code: "",
        isSentCode: false,
        showPassword: false,
        errorObj: "",
        isError: false,
      };
    },
    methods: {
      submit() {
        this.$Amplify.Auth.forgotPassword(this.email)
          .then(() => {
            this.isSentCode = true;
          })
          .catch((e) => this.setError(e));
      },
      verify() {
        this.$Amplify.Auth.forgotPasswordSubmit(this.email, this.code, this.password)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.email });
          })
          .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.email });
      },
      setError(e) {
        this.errorObj = this.$Amplify.I18n.get(e.message || e);
        this.isError = true;
        // console.log("isError: ", this.isError);
        // console.log("setError: ", e);
      },
      validate() {
        this.$refs.resetPasswordForm.validate();
      },
      reset() {
        this.$refs.resetPasswordForm.reset();
      },
      resetValidation() {
        this.$refs.resetPasswordForm.resetValidation();
      },
    },
    mounted() {
      this.$nextTick(function() {
        this.valid = false;
        // this.validate();
      });
    },
    watch: {
      userNameEmail: {
        immediate: true,
        handler() {
          this.email = this.userNameEmail;
        },
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
      code: {
        required,
        minLength: minLength(6),
        decimal,
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
        !this.$v.password.required && errors.push("A new password is required.");
        return errors;
      },
      codeErrors() {
        const errors = [];
        if (!this.$v.code.$dirty) return errors;
        !this.$v.code.decimal && errors.push("The confirmation code may only contain numbers.");
        !this.$v.code.minLength &&
          errors.push("Confirmation code must be at least 6 characters long");
        !this.$v.code.required && errors.push("Confirmation code is required.");
        return errors;
      },
    },
  };
</script>
