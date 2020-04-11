<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="primary">
      <v-toolbar-title>Reset Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="resetPasswordForm" v-model="valid" lazy-validation>
        <v-text-field
          label="E-Mail"
          type="email"
          :rules="emailRules"
          v-model="localUserNameEmail"
          required
        />
        <template v-if="isSentCode">
          <v-text-field :rules="confirmRules" label="Code" type="text" v-model="code" required />
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
        </template>
        <template v-if="!isSentCode">
          <v-btn block :disabled="!valid" @click="submit" color="primary">Send Code</v-btn>
        </template>
        <template v-if="isSentCode">
          <v-btn block :disabled="!valid" @click="verify" color="primary">Submit</v-btn>
        </template>
      </v-form>
      <!-- <v-form>
        <v-text-field label="E-Mail" type="email" v-model="localUserNameEmail" />
        <template v-if="isSentCode">
          <v-text-field label="Code" type="text" v-model="code" />
          <v-text-field
            label="New Password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
            @click:append="showPassword = !showPassword"
          />
        </template>
      </v-form> -->
    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <template v-if="!isSentCode">
        <v-btn x-small text @click="signIn">Back to Sign In.</v-btn>
      </template>
      <template v-if="isSentCode">
        <v-btn x-small text @click="submit">Resend code</v-btn>
      </template>
    </v-card-actions>
    <!-- <template v-if="!isSentCode">
      <v-card-actions>
        <v-spacer />
        <v-btn @click="submit" color="primary">Send Code</v-btn>
        <v-spacer />
      </v-card-actions>
      <v-card-actions>
        <v-spacer />
        <v-btn x-small text @click="signIn">Back to Sign In.</v-btn>
        <v-spacer />
      </v-card-actions>
    </template>
    <template v-if="isSentCode">
      <v-card-actions>
        <v-spacer />
        <v-btn @click="verify" color="primary">Submit</v-btn>
        <v-spacer />
      </v-card-actions>
      <v-card-actions>
        <v-spacer />
        <v-btn x-small text @click="submit">Resend code</v-btn>
        <v-spacer />
      </v-card-actions>
    </template> -->
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
        isSentCode: false,
        showPassword: false,
        errorObj: "",
        isError: false,
        valid: true,

        code: "",
        confirmRules: [
          (v) => !!v || "Confirmation Code is required",
          (v) => (v && v.length === 6) || "Confirmation Code must be 6 characters",
        ],
        localUserNameEmail: "",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: "",
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length > 6) || "Password must be longer than 6 characters",
        ],
      };
    },
    methods: {
      submit() {
        this.$Amplify.Auth.forgotPassword(this.localUserNameEmail)
          .then(() => {
            this.isSentCode = true;
          })
          .catch((e) => this.setError(e));
      },
      verify() {
        this.$Amplify.Auth.forgotPasswordSubmit(this.localUserNameEmail, this.code, this.password)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
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
          this.localUserNameEmail = this.userNameEmail;
        },
      },
    },
  };
</script>
