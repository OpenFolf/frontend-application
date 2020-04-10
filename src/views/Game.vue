<template>
  <v-container fluid>
    <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" hide-default-footer>
      <!-- <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage"> -->
      <template v-slot:header>
        <v-app-bar color="primary" app hide-on-scroll>
          <v-toolbar-title class="headline">Sort courses:</v-toolbar-title>
          <v-spacer />
          <v-btn-toggle>
            <v-btn depressed :value="!filter">
              <v-icon>fa-sort-alpha-down-alt</v-icon>
            </v-btn>
            <v-btn depressed :value="filter">
              <v-icon>fa-globe-europe</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-app-bar>
      </template>

      <template v-slot:default="props">
        <v-content>
          <v-row v-for="item in props.items" :key="item.name">
            <v-col class="py-1">
              <v-card color="accent" ripple :to="{ name: 'lobby' }">
                <v-card-title class="headline">
                  {{ item.name }}
                  <v-spacer />
                  <v-icon> fa-angle-right </v-icon>
                </v-card-title>
                <v-card-subtitle>
                  {{ item.calories }}
                  <v-avatar class="mx-1" tile size="14" color="red"></v-avatar>
                  <v-avatar class="mx-1" tile size="14" color="white"></v-avatar>
                  <v-avatar class="mx-1" tile size="14" color="blue"></v-avatar>
                  <v-avatar class="mx-1" tile size="14" color="yellow"></v-avatar>
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-content>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  import { v4 } from "uuid/v4";
  // console.log(v4());
  export default {
    name: "game",
    data: () => ({
      filter: true,
      itemsPerPage: 100,
      items: [
        {
          name: "Fossvogur",
          id: v4(),
        },
        {
          name: "Klambratún",
          id: v4(),
        },
        {
          name: "Laugardalur",
          id: v4(),
        },
        {
          name: "Gufunes",
          id: v4(),
        },
        {
          name: "Grafarvogur",
          id: v4(),
        },
        {
          name: "Fjarkanistan",
          id: v4(),
        },
        {
          name: "Hafnarfjörður",
          id: v4(),
        },
        {
          name: "Kópavogur",
          id: v4(),
        },
        {
          name: "Selfoss",
          id: v4(),
        },
        {
          name: "Egilstaðir",
          id: v4(),
        },
        {
          name: "Breiðholt",
          id: v4(),
        },
        {
          name: "Kjalarnes",
          id: v4(),
        },
      ],
    }),
  };
</script>
