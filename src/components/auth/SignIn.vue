<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" v-if="!signedIn">
    <v-toolbar color="#41b883">
      <v-img
        class="mr-2"
        :src="require('@/assets/basket_white.png')"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>openFOLF - Sign In</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-Mail" type="email" v-model="signInUsername" />
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
      <v-btn @click="signIn" color="#41b883">SIGN IN</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="signUp">No account? Create one!</v-btn>
      <v-spacer />
    </v-card-actions>
    <v-card-actions>
      <v-spacer />
      <v-btn x-small text @click="forgot">Forgot your password? Reset Password.</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" v-else>
    <v-card-text class="mx-auto">
      <p class="text-center headline">Signed In!</p>
    </v-card-text>
  </v-card>
</template>

<script>
  import { mapGetters } from "vuex";
  import { AmplifyEventBus } from "aws-amplify-vue";
  export default {
    name: "sign-in",
    data() {
      return {
        showPassword: false,
        password: "",
        signInUsername: "",
        // error: "",
      };
    },
    methods: {
      signIn() {
        this.$Amplify.Auth.signIn(this.signInUsername, this.password)
          .then(() => {
            return AmplifyEventBus.$emit("authState", "signedIn");
          })
          .then(() => {
            this.password = "";
            this.signInUsername = "";
          })
          .catch((e) => {
            if (e.code && e.code === "UserNotConfirmedException") {
              this.$emit("authState", { msg: "confirmSignUp", username: this.signInUsername });
              // AmplifyEventBus.$emit("localUser", { username: this.signInUsername });
              // AmplifyEventBus.$emit("authState", "confirmSignUp");
            } else {
              // this.setError(e);
              console.log("error: ", e);
            }
          });
      },
      signUp() {
        this.$emit("authState", { msg: "signUp" });
      },
      forgot() {
        this.$emit("authState", { msg: "forgotPassword", username: this.signInUsername });
      },
      setError(e) {
        // TODO create an Error Message
        console.log(e);
      },
      // setError: function(e) {
      //   this.error = this.$Amplify.I18n.get(e.message || e);
      //   this.logger.error(this.error);
      // },
    },
    computed: {
      ...mapGetters(["signedIn"]),
    },
  };
</script>
