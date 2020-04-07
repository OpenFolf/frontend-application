<template>
  <v-app>
    <router-view />
    <bottom-nav v-if="getSignedIn" />
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
      ...mapGetters(["getSignedIn"]),
    },
  };
</script>
