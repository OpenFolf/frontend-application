<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="d-flex flex-column justify-center">
        <v-img :src="require('@/assets/openfolfwhite.svg')" height="130" contain />
        <h1 class="text-center pt-0 mt-2">openFOLF</h1>
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
  };
</script>
