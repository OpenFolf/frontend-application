<template>
  <v-app-bar color="#41b883" app>
    <!-- <v-img
      class="mr-2"
      :src="require('@/assets/basket_white.png')"
      max-height="40"
      max-width="40"
      contain
    /> -->
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
