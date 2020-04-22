<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary" flat>
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
          :success-messages="codeResendSuccess"
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
      <v-btn x-small text @click="resend" :disabled="$v.email.$invalid"
        >Lost the code? Resend code.</v-btn
      >
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="this.SIGN_IN">Back to Sign In.</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import { required, email, minLength, decimal } from "vuelidate/lib/validators";
  export default {
    name: "confirm-sign-up",
    data() {
      return {
        email: "",
        confirmCode: "",
        successMessage: "",
      };
    },
    methods: {
      ...mapActions(["confirmSignUp", "resendSignUp"]),
      ...mapMutations(["SIGN_IN", "SIGN_UP", "CONFIRM_SIGN_UP", "ERROR_MSG", "CLEAR_ERRORS"]),
      confirm() {
        console.log("this email", this.email, "this.confirmCode", this.confirmCode);
        this.confirmSignUp({ email: this.email, confirmCode: this.confirmCode });
      },
      resend() {
        if (this.resendSignUp(this.email)) {
          this.successMessage = "New confirmation code successfully sent";
        }
      },
      clearSuccessMessage() {
        this.successMessage = "";
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
    created() {
      this.email = this.authState.email;
    },

    computed: {
      ...mapGetters(["errorMsg", "authState"]),
      codeResendSuccess() {
        console.log("this.successMessage", this.successMessage);
        const success = [];
        if (this.successMessage) {
          this.CLEAR_ERRORS();
          success.push(this.successMessage);
        }
        this.clearSuccessMessage();
        return success;
      },
      emailErrors() {
        console.log("this.errorMsg.message", this.errorMsg.message);
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
