<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="info" class="pa-1 overflow-x-auto">
          <v-card-title>{{ course.getCourse.name }}</v-card-title>
          <v-card-title>{{ course.getCourse.holeCount }}</v-card-title>
          <v-card-title>{{ course.getCourse.teetype }}</v-card-title>
          <v-card-title>{{ course.getCourse.baskettype }}</v-card-title>
          <v-card-title>{{ course.getCourse.description }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "game-course-info",
    props: {
      course: {
        type: Object,
        required: true,
      },
    },
  };
</script>
