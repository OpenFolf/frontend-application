<template>
  <v-app>
    <error-boundary>
      <router-view />
      <bottom-nav v-if="getSignedIn && !getHideBottomNav" />
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
      ...mapGetters(["getSignedIn", "getHideBottomNav"]),
    },
  };
</script>
