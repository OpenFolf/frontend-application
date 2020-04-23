<template>
  <v-app>
    <error-boundary>
      <router-view />
      <bottom-nav v-if="signedIn && getBottomNav" />
    </error-boundary>
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";
  import BottomNav from "@/components/BottomNav.vue";
  import ErrorBoundary from "../src/components/errorBoundary/error-boundary";
  export default {
    name: "App",
    components: {
      BottomNav,
      ErrorBoundary,
    },
    computed: {
      ...mapGetters(["signedIn", "getBottomNav"]),
    },
  };
</script>
