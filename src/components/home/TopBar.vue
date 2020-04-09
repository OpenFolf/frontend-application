<template>
  <v-app-bar color="#41b883" app>
    <router-link :to="{ name: 'home-menu' }">
      <v-avatar><v-icon>fa-home</v-icon></v-avatar>
    </router-link>
    <v-toolbar-title class="headline font-weight-bold">/ {{ isHome ? "" : path }}</v-toolbar-title>
    <v-spacer />
    <sign-out />
  </v-app-bar>
</template>

<script>
  import SignOut from "@/components/auth/SignOut.vue";
  export default {
    name: "home-top-bar",
    components: {
      SignOut,
    },
    data() {
      return {
        path: "",
        isHome: true,
      };
    },
    methods: {
      pathBar() {
        let cleanPath = [...this.$route.path].filter((x) => x !== "/").join("");
        if (cleanPath.length > 4) {
          this.path = cleanPath.charAt(4).toUpperCase() + cleanPath.slice(5);
          this.isHome = false;
        } else {
          this.path = "";
          this.isHome = true;
        }
      },
    },
    watch: {
      $route() {
        this.pathBar();
      },
    },
  };
</script>
