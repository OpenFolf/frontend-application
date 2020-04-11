<template>
  <v-container fluid>
    <v-row dense>
      <home-menu-item v-for="item in contentList" :key="item.id" :content="item" />
    </v-row>
  </v-container>
</template>

<script>
  import HomeMenuItem from "@/components/home/MenuItem.vue";
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
            title: "openFOLF User Profile",
            subtitle: "Edit you information, e.g. add an avatar og change your display name.",
            buttonText: "Edit Profile",
            routerPath: {
              name: "home-profile",
            },
          },
          {
            id: 2,
            color: "accent",
            title: "Allow Location Service",
            subtitle:
              "To be able to fully utilize the features of the app, please consider allowing Location services.",
            buttonText: "Enable Location Service",
            routerPath: {
              name: "",
            },
          },
          {
            id: 3,
            color: "success",
            title: "Disc Golf Rules",
            subtitle: "Do you know how to play Disc Golf? Read the official PDGA rules.",
            buttonText: "See Rules",
            routerPath: {
              name: "home-rules",
            },
          },
          {
            id: 4,
            color: "addedColor",
            title: "Privacy Disclaimer",
            subtitle: "Legalized lagadót um lögræði.",
            buttonText: "Check yo Privilage",
            routerPath: {
              name: "home-privacy",
            },
          },
          {
            id: 5,
            color: "secondary",
            title: "Nice Feature",
            subtitle:
              "Some nice feature that makes your life awesome! High 'n' Tight, you should try it today.",
            buttonText: "Try it out",
            routerPath: {
              name: "",
            },
          },
        ],
      };
    },
  };
</script>
