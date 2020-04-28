<template>
  <v-container class="ma-0 pa-0" fluid>
    <!-- <v-row dense>
      <v-col cols="12"> -->
    <v-card
      color="secondary"
      tile
      class="d-flex flex-column justify-center align-center px-2 py-4 ma-0"
      flat
    >
      <v-img
        v-if="checkUrl"
        :src="course.course_photo_url_medium"
        class="mb-2"
        height="300px"
        contain
      />
      <v-card-text class="white--text text-center pa-2 subtitle-1">
        {{ course.description }}
      </v-card-text>
      <v-card-subtitle class="d-flex flex-row">
        <v-img :src="require('@/assets/basket_white.png')" max-width="2rem" height="2rem" contain />
        <span class="white--text headline font-weight-bold">{{ course.holeCount }}</span>
      </v-card-subtitle>
      <v-card-subtitle class="pt-1 pb-1">
        <span class="white--text title font-weight-bold"> Tees: </span>
        <span class="white--text headline">{{ course.teetype }}</span>
      </v-card-subtitle>
      <template v-if="holeSums.find((m) => m.length > 0 || m.parTotal > 0)">
        <v-card-subtitle v-for="(tee, index) in holeSums" :key="index" class="pb-1 pt-1">
          <span class="white--text title font-weight-bold" v-if="tee.length || tee.parTotal">
            {{ tee.name }}:
          </span>
          <span v-if="tee.length" class="white--text"> {{ tee.length }} meters. </span>
          <span v-if="tee.parTotal" class="white--text font-weight-bold title">
            Par: {{ tee.parTotal }}
          </span>
        </v-card-subtitle>
      </template>
      <v-card-subtitle v-if="!isBasket" class="pt-1 pb-1">
        <span class="white--text font-weight-bold mr-2">Basket:</span>
        <span class="white--text">{{ course.baskettype }}</span>
      </v-card-subtitle>
    </v-card>
    <!-- </v-col>
    </v-row> -->
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
