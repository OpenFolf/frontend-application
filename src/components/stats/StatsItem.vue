<template>
  <fragment>
    <v-app-bar color="primary" dark app flat>
      <v-toolbar-title class="display-1 font-weight-bold">Stats / NAME</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1>typpi Item</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </fragment>
</template>

<script>
  import { Fragment } from "vue-fragment";
  export default {
    name: "stats-item",
    components: {
      Fragment,
    },
  };
</script>
