<template>
  <v-app>
    <router-view />
    <bottom-nav v-if="signedIn" />
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";
  import BottomNav from "@/components/BottomNav.vue";
  export default {
    name: "App",
    components: {
      BottomNav,
    },
    computed: {
      ...mapGetters(["signedIn"]),
    },
  };
</script>
