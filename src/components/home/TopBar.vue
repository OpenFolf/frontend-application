<template>
  <v-app-bar color="primary" dark app flat>
    <v-toolbar-title class="display-1 font-weight-bold">
      Home {{ isHome ? "" : "/ " + path }}
    </v-toolbar-title>
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
        isHome: false,
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
    mounted() {
      this.pathBar();
    },
    watch: {
      immediate: true,
      $route: {
        handler() {
          this.pathBar();
        },
      },
    },
  };
</script>
