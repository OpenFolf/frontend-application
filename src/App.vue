<template>
  <v-app>
    <v-content>
      <h1>openFOLF</h1>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App",

    data: () => ({
      tempData: "value",
    }),
  };
</script>
