<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="d-flex justify-center ">
        <v-img
          :src="require('@/assets/openfolfwhite.svg')"
          max-height="130"
          max-width="130"
          contain
          class="d-flex justify-content-center pb-0"
        />
      </v-col>
      <v-col class="pt-0">
        <h1 class="text-center pt-0">openFOLF</h1>
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
