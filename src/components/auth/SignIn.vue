<template>
  <v-card width="400px" class="mx-auto my-5 font-weight-bold" v-if="!getSignedIn">
    <v-toolbar color="#41b883">
      <v-img
        class="mr-2"
        :src="require('@/assets/basket_white.png')"
        max-height="35"
        max-width="35"
        contain
      />
      <v-toolbar-title>Sign In</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="E-Mail" type="email" v-model="localUserNameEmail" />
        <v-text-field
          label="Password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
          @click:append="showPassword = !showPassword"
          @keyup.enter="signIn"
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
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "sign-in",
    props: {
      userNameEmail: {
        type: String,
        required: false,
        default: "",
      },
    },
    data() {
      return {
        showPassword: false,
        password: "",
        localUserNameEmail: "",
        // error: "",
      };
    },
    methods: {
      ...mapActions(["setSignedIn", "setUserAuthObject", "setUserId", "fetchUser"]),
      signIn() {
        this.$Amplify.Auth.signIn(this.localUserNameEmail, this.password)
          .then(() => {
            this.setSignedIn(true);
            this.$Amplify.Auth.currentAuthenticatedUser()
              .then((data) => {
                if (data && data.signInUserSession) {
                  this.setUserAuthObject(data);
                  this.setUserId(data.username);
                }
              })
              .catch((e) => console.log("error: ", e));
            // .catch((e) => this.setError(e));
          })
          .then(() => {
            this.password = "";
            this.localUserNameEmail = "";
            //this.fetchUser();
          })
          .catch((e) => {
            if (e.code && e.code === "UserNotConfirmedException") {
              this.$emit("authState", { msg: "confirmSignUp", username: this.localUserNameEmail });
            } else {
              console.log("error: ", e);
              // this.setError(e);
            }
          });
      },
      signUp() {
        this.$emit("authState", { msg: "signUp" });
      },
      forgot() {
        this.$emit("authState", { msg: "forgotPassword", username: this.localUserNameEmail });
      },
      // setError: function(e) {
      //   this.error = this.$Amplify.I18n.get(e.message || e);
      //   this.logger.error(this.error);
      // },
    },
    computed: {
      ...mapGetters(["getSignedIn"]),
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
