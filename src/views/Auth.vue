<template>
  <v-container class="fill-height">
    <v-row justify="center" align-content="center">
      <p class="display-2 font-weight-bold">openFOLF</p>
      <authenticator />
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
  };
</script>
