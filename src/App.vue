<template>
  <v-app>
    <error-boundary>
      <router-view />
      <bottom-nav v-if="signedIn && getBottomNav" />
      <!-- <keyboard v-if="signedIn && !getBottomNav" /> -->
    </error-boundary>
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";
  import BottomNav from "@/components/BottomNav.vue";
  // import Keyboard from "@/components/game/Keyboard.vue";
  import ErrorBoundary from "../src/components/errorBoundary/error-boundary";
  export default {
    name: "App",
    components: {
      BottomNav,
      // Keyboard,
      ErrorBoundary,
    },
    computed: {
      ...mapGetters(["signedIn", "getBottomNav"]),
    },
  };
</script>
