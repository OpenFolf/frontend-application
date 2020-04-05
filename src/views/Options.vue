<template>
  <v-card max-width="400" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" class="mb-2">
            <v-card-text class="text-center text--white font-weight-black headline pb-0">
              Dark or Light Theme?
            </v-card-text>
            <v-card-subtitle class="text-center">
              You can toggle the theme of the application. Do you like it dark or light?
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer />
              <v-btn block outlined @click="toggleDark">Toggle Theme</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card color="#952175">
            <v-card-text class="text-center text--white font-weight-black headline">
              Quit the application!
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="signOutAWS" block outlined>sign out</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { mapActions } from "vuex";
  import { AmplifyEventBus } from "aws-amplify-vue";
  export default {
    name: "options",
    methods: {
      ...mapActions(["signOut"]),
      toggleDark() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      },
      signOutAWS() {
        this.$Amplify.Auth.signOut()
          .then(() => {
            return AmplifyEventBus.$emit("authState", "signedOut");
          })
          .catch((e) => this.setError(e));
        this.signOut();
      },
      setError: function(e) {
        console.log("error", e);
      },
    },
  };
</script>
