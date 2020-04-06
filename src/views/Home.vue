<template>
  <fragment>
    <top-bar />
    <v-content>
      <v-card max-width="400" class="mx-auto">
        <v-container>
          <v-row dense>
            <home-list-item v-for="item in contentList" :key="item.id" :content="item" />
            <!-- <v-col cols="12">
              <v-card color="#ACCE55">
                <v-card-title class="headline">openFOLF User Profile</v-card-title>
                <v-card-subtitle>
                  Change you information, e.g. add an avatar or change your display name.
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn text>Edit Profile</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="#10ADED">
                <v-card-title class="headline">Rules of the Game</v-card-title>
                <v-card-subtitle>
                  Do you know how to play Disc Golf? Read the official PDGA rules.
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn text>Read Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="#C55C55">
                <v-card-title class="headline">Donate - We love Money!</v-card-title>
                <v-card-subtitle>
                  Cash rules everything around me, CREAM, get the money, dollar dollar bill yo!
                </v-card-subtitle>
                <v-card-actions>
                  <v-btn text>Donate Now</v-btn>
                </v-card-actions>
              </v-card>
            </v-col> -->
          </v-row>
        </v-container>
      </v-card>
    </v-content>
  </fragment>
</template>

<script>
  import TopBar from "@/components/home/TopBar.vue";
  import HomeListItem from "@/components/home/HomeListItem.vue";
  import { Fragment } from "vue-fragment";
  export default {
    name: "home",
    data() {
      return {
        contentList: [
          {
            id: 1,
            color: "#ACCE55",
            title: "openFOLF User Profile",
            subtitle: "Edit you information, e.g. add an avatar og change your display name.",
            buttonText: "Edit Profile",
          },
          {
            id: 2,
            color: "#10ADED",
            title: "Disc Golf Rules",
            subtitle: "Do you know how to play Disc Golf? Read the official PDGA rules.",
            buttonText: "See Rules",
          },
        ],
      };
    },
    components: {
      TopBar,
      Fragment,
      HomeListItem,
    },
  };
</script>
