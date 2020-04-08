<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold">
    <v-toolbar color="primary">
      <v-img
        class="mr-2"
        :src="require('@/assets/basket_white.png')"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>Sign Up</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <p>Your E-Mail will be your User Name.</p>
      <v-form>
        <v-text-field label="E-Mail" type="email" v-model="localUserNameEmail" />
        <v-text-field
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword = !showPassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="signUp" color="primary">Sign Up</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="signIn">Already have an account? Sign In!</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: "sign-up",
    data() {
      return {
        localUserNameEmail: "",
        password: "",
        showPassword: false,
      };
    },
    methods: {
      signUp() {
        this.$Amplify.Auth.signUp({
          attributes: { email: this.localUserNameEmail },
          username: this.localUserNameEmail,
          password: this.password,
        })
          .then((data) => {
            if (data.userConfirmed === false) {
              return this.$emit("authState", {
                msg: "confirmSignUp",
                username: this.localUserNameEmail,
              });
            }
            return this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
          })
          .catch((e) => console.log("error: ", e));
        // .catch((e) => this.setError(e));
      },
      signIn() {
        this.$emit("authState", { msg: "signIn", username: this.localUserNameEmail });
      },
    },
  };
</script>
