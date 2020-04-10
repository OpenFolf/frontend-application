<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="primary">
      <v-toolbar-title>Reset Password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
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
      </v-form>
    </v-card-text>
    <template v-if="!isSentCode">
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
    </template>
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
        localUserNameEmail: "",
        code: "",
        password: "",
        showPassword: false,
      };
    },
    methods: {
      submit() {
        this.$Amplify.Auth.forgotPassword(this.localUserNameEmail)
          .then(() => {
            this.isSentCode = true;
          })
          .catch((e) => console.log("error: ", e));
        // .catch((e) => this.setError(e));
      },
      verify() {
        this.$Amplify.Auth.forgotPasswordSubmit(this.localUserNameEmail, this.code, this.password)
          .then(() => {
            this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
          .catch((e) => console.log("error: ", e));
        // .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
      },
      // setError(e) {
      //   this.error = this.$Amplify.I18n.get(e.message || e);
      //   this.logger.error(this.error);
      // },
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
