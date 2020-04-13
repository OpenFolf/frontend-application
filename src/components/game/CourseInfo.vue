<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="secondary" class="pa-1 overflow-x-auto">
          <v-img
            v-if="checkUrl"
            :src="course.getCourse.course_photo_url_medium"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>

          <v-card-subtitle class="pb-1"
            >Nr. of holes: {{ course.getCourse.holeCount }}</v-card-subtitle
          >
          <v-card-subtitle class="pt-1 pb-1">Tee: {{ course.getCourse.teetype }}</v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1"
            >basket: {{ course.getCourse.baskettype }}</v-card-subtitle
          >
          <v-card-subtitle class="pt-1 pb-1">{{ course.getCourse.description }}</v-card-subtitle>
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
    computed: {
      checkUrl() {
        return (
          this.course.getCourse.course_photo_url_medium.endsWith(".jpg") ||
          this.course.getCourse.course_photo_url_medium.endsWith(".png")
        );
      },
    },
  };
</script>
