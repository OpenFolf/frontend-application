<template>
  <v-card class="mx-auto" max-width="500">
    <v-card v-for="course in singleCourse" :key="course.id" :cols="card.flex" fluid>
      <!-- <v-img
        :src="course.course_photo_url_medium"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      > -->
      <v-card-title v-text="course.name"></v-card-title>
      <!-- </v-img> -->
      <h1>test</h1>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    name: "game-course-info",
    props: {
      path: {
        type: Object,
        required: true,
      },
    },
  };
</script>
