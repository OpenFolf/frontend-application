<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary">
      <v-toolbar-title>Confirm Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="confirmSignUpForm">
        <v-text-field
          label="E-Mail"
          type="email"
          @change="$v.email.$touch()"
          :error-messages="emailErrors"
          v-model="email"
          required
        />
        <v-text-field
          label="Confirmation Code"
          v-model="confirmCode"
          @change="$v.confirmCode.$touch()"
          @blur="$v.confirmCode.$touch()"
          :error-messages="confirmCodeErrors"
          type="number"
          required
        />
        <v-btn
          block
          :disabled="$v.email.$invalid || $v.confirmCode.$invalid"
          @click="confirm"
          color="primary"
          >CONFIRM
        </v-btn>
      </v-form>
    </v-card-text>
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
      color="error"
    >
      {{ errorObj }}
    </v-alert>
  </v-card>
</template>

<script>
  import { required, email, minLength, decimal } from "vuelidate/lib/validators";
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
        email: "",
        confirmCode: "",
        errorObj: "",
        isError: false,
      };
    },
    methods: {
      confirm() {
        this.$Amplify.Auth.confirmSignUp(this.email, this.confirmCode)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.email });
          })
          .catch((e) => this.setError(e));
      },
      resend() {
        this.$Amplify.Auth.resendSignUp(this.email)
          .then(() => {
            console.log("Resend success");
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
          this.email = this.userNameEmail;
        },
      },
    },
    validations: {
      email: {
        required,
        email,
      },
      confirmCode: {
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
      confirmCodeErrors() {
        const errors = [];
        if (!this.$v.confirmCode.$dirty) return errors;
        !this.$v.confirmCode.decimal &&
          errors.push("The confirmation code may only contain numbers.");
        !this.$v.confirmCode.minLength &&
          errors.push("Confirmation code must be at least 6 characters long");
        !this.$v.confirmCode.required && errors.push("Confirmation code is required.");
        return errors;
      },
    },
  };
</script>
