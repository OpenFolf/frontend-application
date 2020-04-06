<template>
  <v-app-bar color="#41b883" app>
    <v-avatar><v-icon>fa-user</v-icon></v-avatar>
    <v-toolbar-title>{{ user ? user.username : "" }}</v-toolbar-title>
    <v-spacer />
    <sign-out />
  </v-app-bar>
</template>

<script>
  import SignOut from "@/components/auth/SignOut.vue";
  import { mapGetters } from "vuex";
  export default {
    name: "top-bar",
    components: {
      SignOut,
    },
    computed: {
      ...mapGetters(["user"]),
    },
  };
</script>
