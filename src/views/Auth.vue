<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <p class="text-center display-2 font-weight-bold">openFOLF</p>
        <authenticator />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Authenticator from "@/components/auth/Authenticator.vue";
  export default {
    name: "auth",
    components: {
      Authenticator,
    },
    // beforeRouteEnter(to, from, next) {
    //   next((vm) => {
    //     if (vm.$store.getters.getSignedIn) {
    //       vm.$router.next({ name: "home" });
    //     }
    //     return true;
    //   });
    // },
  };
</script>
