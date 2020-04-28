<template>
  <v-container fluid>
    <v-row dense>
      <home-menu-item v-for="item in contentList" :key="item.id" :content="item" />
    </v-row>
  </v-container>
</template>

<script>
  import HomeMenuItem from "@/components/home/MenuItem.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "home-menu",
    components: {
      HomeMenuItem,
    },
    data() {
      return {
        contentList: [
          {
            id: 1,
            color: "info",
            title: "Your Profile",
            subtitle: "Set your Scorecard Name, Default Tee and Application Theme.",
            buttonText: "Edit Profile",
            routerPath: {
              name: "home-profile",
            },
          },
          {
            id: 2,
            color: "success",
            title: "Disc Golf Rules",
            subtitle: "Do you know how to play Disc Golf? Read the official PDGA rules.",
            buttonText: "See Rules",
            routerPath: {
              name: "home-rules",
            },
          },
        ],
      };
    },
    created() {
      this.bottomNavHandler(true);
    },
    methods: {
      ...mapActions(["defaultRouting", "showBottomNav"]),
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
    },
    computed: {
      ...mapGetters(["signedIn"]),
    },
    watch: {
      signedIn() {
        this.defaultRouting();
      },
    },
  };
</script>
