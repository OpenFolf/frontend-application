<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="accent" class="pa-1 overflow-x-auto" flat>
          <v-img
            v-if="checkUrl"
            :src="course.course_photo_url_medium"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            contain
          >
          </v-img>
          <v-card-text class="pt-1 pb-1 subtitle-1">
            {{ course.description }}
          </v-card-text>
          <v-card-subtitle class="pb-1">
            <span class="font-weight-bold">Nr. of holes: </span>
            <span>{{ course.holeCount }}</span>
          </v-card-subtitle>
          <v-card-subtitle class="pt-1 pb-1">
            <span class="font-weight-bold"> Tees: </span>
            <span>{{ course.teetype }}</span>
          </v-card-subtitle>
          <template v-if="holeSums.find((m) => m.length > 0 || m.parTotal > 0)">
            <div v-for="(tee, index) in holeSums" :key="index">
              <v-card-subtitle class="pb-1 pt-1">
                <span class="font-weight-bold" v-if="tee.length || tee.parTotal">
                  {{ tee.name }}:
                </span>
                <span v-if="tee.length">Length: {{ tee.length }} meters. </span>
                <span v-if="tee.parTotal">Par: {{ tee.parTotal }}</span>
              </v-card-subtitle>
            </div>
          </template>
          <v-card-subtitle v-if="!isBasket" class="pt-1 pb-1">
            <span class="font-weight-bold">Basket:</span>
            <span>{{ course.baskettype }}</span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // import div from "vue-div";
  export default {
    name: "game-course-info",
    props: {
      course: {
        type: Object,
        required: true,
      },
      holeSums: {
        type: Array,
        required: true,
      },
    },
    components: {
      // div,
    },
    computed: {
      checkUrl() {
        return (
          this.course.course_photo_url_medium.endsWith(".jpg") ||
          this.course.course_photo_url_medium.endsWith(".png")
        );
      },
      isBasket() {
        return this.course.baskettype === "baskettype";
      },
    },
  };
</script>
