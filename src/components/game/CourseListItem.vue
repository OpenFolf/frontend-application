<template>
  <v-col cols="12">
    <v-card
      color="accent"
      ripple
      flat
      :to="{
        name: 'game-course',
        params: { path: pathName, id: content.id },
      }"
    >
      <v-card-title class="mb-3">
        <span class="white--text headline ">{{ content.name }}</span>
        <v-spacer />
        <v-icon dark large>fa-angle-right</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-icon dark class="mr-2">fa-map-marker-alt</v-icon>
        <span class="title white--text">{{ content.distance }} KM</span>
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
  import { replaceIcelandicCharacters } from "@/services";
  import { mapActions } from "vuex";
  export default {
    name: "course-list-item",
    props: {
      content: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        pathName: replaceIcelandicCharacters(this.content.name),
      };
    },
    methods: {
      ...mapActions(["fetchCourse"]),
    },
  };
</script>
