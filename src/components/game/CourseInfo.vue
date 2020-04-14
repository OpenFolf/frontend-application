<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="secondary" class="pa-1 overflow-x-auto">
          <v-img
            v-if="checkUrl"
            :src="course.course_photo_url_medium"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
          </v-img>
          <div v-for="(tee, index) in lengthSums" :key="index">
            <v-card-subtitle class="pb-1" v-if="tee.length">
              {{ tee.name }}: {{ tee.length }} meters</v-card-subtitle
            >
          </div>
          <div v-for="(par, index) in parSums" :key="index">
            <v-card-subtitle class="pb-1" v-if="par.parTotal">
              Total: {{ par.name }}: {{ par.parTotal }}</v-card-subtitle
            >
          </div>
          <v-card-subtitle class="pb-1">Nr. of holes: {{ course.holeCount }}</v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1">Tee: {{ course.teetype }}</v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1">basket: {{ course.baskettype }}</v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1">{{ course.description }} </v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1">{{ $log(course) || course }} </v-card-subtitle>
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
      lengthSums: {
        type: Array,
        required: true,
      },
      parSums: {
        type: Array,
        required: true,
      },
    },
    computed: {
      checkUrl() {
        return (
          this.course.course_photo_url_medium.endsWith(".jpg") ||
          this.course.course_photo_url_medium.endsWith(".png")
        );
      },
    },
  };
</script>
