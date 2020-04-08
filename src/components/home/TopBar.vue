<template>
  <v-app-bar color="primary" app>
    <v-avatar><v-icon>fa-user</v-icon></v-avatar>
    <v-toolbar-title>{{ getEmail }}</v-toolbar-title>
    <v-spacer />
    <sign-out />
  </v-app-bar>
</template>

<script>
  import SignOut from "@/components/auth/SignOut.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "top-bar",
    components: {
      SignOut,
    },
    computed: {
      ...mapGetters(["getEmail"]),
    },
    methods: {
      ...mapActions(["fetchUser"]),
    },
    beforeMount() {
      this.fetchUser();
    },
  };
</script>
