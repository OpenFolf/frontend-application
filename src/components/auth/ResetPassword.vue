<template>
  <v-card outlined width="400px" class="mx-auto my-5 font-weight-bold" flat>
    <v-toolbar color="primary" flat>
      <v-toolbar-title class="white--text">Reset Password</v-toolbar-title>
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
          <v-btn block :disabled="$v.email.$invalid" @click="resetUserPassword" color="success">
            <span class="font-weight-bold">Send Code</span>
          </v-btn>
        </template>
        <template v-if="isSentCode">
          <v-btn block :disabled="$v.code.$invalid" @click="verify" color="success">
            <span class="font-weight-bold">Submit</span>
          </v-btn>
        </template>
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <template v-if="isSentCode">
        <v-spacer />
        <v-btn x-small text @click="resetUserPassword">Resend code</v-btn>
        <v-spacer />
      </template>
    </v-card-actions>
    <v-card-actions class="d-flex justify-center">
      <template>
        <v-spacer />
        <v-btn x-small text @click="this.SIGN_IN">Back to Sign In.</v-btn>
        <v-spacer />
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import { required, email, minLength, decimal } from "vuelidate/lib/validators";
  export default {
    name: "reset-password",
    data() {
      return {
        email: "",
        password: "",
        code: "",
        isSentCode: false,
        showPassword: false,
      };
    },
    created() {
      this.email = this.authState.email;
    },
    methods: {
      ...mapMutations(["SIGN_IN", "SIGN_UP", "CLEAR_ERRORS"]),
      ...mapActions(["resetPassword", "forgotPasswordSubmit"]),
      resetUserPassword() {
        if (this.resetPassword(this.email)) {
          this.isSentCode = true;
        }
      },
      async verify() {
        await this.forgotPasswordSubmit({
          email: this.email,
          code: this.code,
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
      code: {
        required,
        minLength: minLength(6),
        decimal,
      },
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
