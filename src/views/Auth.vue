<template>
  <v-container>
    <div :style="styleObject">
      <p class="title pa-0 mr-5">Signed in: [ {{ signedIn }} ]</p>
      <p class="title pa-0 mb-4">User: [ {{ user ? user.username : "none" }} ]</p>
    </div>
    <v-btn x-large block @click="fakeSignin" color="red">
      <span class="mr-5 headline font-weight-bold">FAKE </span>
      <v-icon large right>fa-sign-in-alt</v-icon>
    </v-btn>
    <v-divider class="my-5" />
    <v-btn x-large block @click="navigate" color="blue">
      <v-icon large>fa-home</v-icon>
    </v-btn>
    <v-divider class="my-5" />
    <v-btn x-large block @click="showAmplify = !showAmplify" color="#f90">
      <span class="mr-5 headline font-weight-bold">TOGGLE</span>
      <v-icon large right>fab fa-aws</v-icon>
    </v-btn>
    <v-divider class="my-5" />
    <template v-if="showAmplify">
      <div :style="styleObject">
        <amplify-authenticator />
      </div>
    </template>
    <v-divider class="my-5" />
    <v-btn x-large block @click="showCustom = !showCustom" color="#41b883">
      <span class="mr-5 headline font-weight-bold">TOGGLE</span>
      <v-icon large right>fa-unlock-alt</v-icon>
    </v-btn>
    <v-divider class="my-5" />
    <template v-if="showCustom">
      <authenticator />
    </template>
    <v-divider class="my-5" />
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "auth",
    components: {
      authenticator: () => import("@/components/auth/Authenticator.vue"),
    },
    data() {
      return {
        showCustom: false,
        showAmplify: false,
        styleObject: {
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          alignItems: "center",
        },
      };
    },
    computed: {
      ...mapGetters(["user", "signedIn"]),
    },
    methods: {
      ...mapActions(["setUser", "setSignedIn"]),
      fakeSignin() {
        const username = "Folfberg Nördakall";
        this.setUser({ username });
        this.setSignedIn(true);
        this.$router.push({ name: "home" });
      },
      navigate() {
        this.$router.push({ name: "home" });
      },
    },
  };
</script>
