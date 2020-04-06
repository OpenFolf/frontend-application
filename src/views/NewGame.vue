<template>
  <v-content>
    <v-card max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#45651C">
              <v-card-title class="headline">
                Some kind of filter? <v-icon right>fa-filter</v-icon>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col v-for="course in courses" :key="course.course_id" cols="12">
            <v-card :color="course.color" ripple :to="{ name: 'lobby' }">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="" v-text="course.name"></v-card-title>
                  <v-card-subtitle>Nr. of holes: {{ course.holes }}</v-card-subtitle>
                  <span>
                    <v-avatar
                      v-if="course.tee_1_clr !== ''"
                      class="ma-3"
                      size="25"
                      tile
                      :style="{
                        backgroundColor: `#${course.tee_1_clr}`,
                      }"
                    />
                    <v-avatar
                      v-if="course.tee_2_clr !== ''"
                      class="ma-3"
                      size="25"
                      tile
                      :style="{ backgroundColor: `#${course.tee_2_clr}` }"
                    />
                    <v-avatar
                      v-if="course.tee_3_clr !== ''"
                      class="ma-3"
                      size="25"
                      tile
                      :style="{ backgroundColor: `#${course.tee_3_clr}` }"
                    />
                    <v-avatar
                      v-if="course.tee_4_clr !== ''"
                      class="ma-3"
                      size="25"
                      tile
                      :style="{ backgroundColor: `#${course.tee_4_clr}` }"
                    />
                  </span>
                </div>
                <v-avatar class="ma-3" size="100" tile>
                  <v-img :src="course.course_photo_url_medium"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-content>
</template>

<script>
  export default {
    name: "new-game",
    data() {
      return {
        courses: [
          {
            course_id: "4726",
            name: "Klambratúni Park",
            holes: "9",
            city: "Reykjavik",
            state: "0",
            country: "Iceland",
            zipcode: "",
            latitude: "64.137460",
            longitude: "-21.913551",
            street_addr: "",
            reviews: "5",
            rating: "2.80",
            private: "0",
            paytoplay: "0",
            tee_1_clr: "",
            tee_2_clr: "FFFFFF",
            tee_3_clr: "",
            tee_4_clr: "",
            dgcr_url: "https://www.dgcoursereview.com/course.php?id=4726",
            dgcr_mobile_url: "https://www.dgcoursereview.com/mobile/course.php?id=4726",
            rating_img: "https://www.dgcoursereview.com/images/rating/discs_3.png",
            rating_img_small: "https://www.dgcoursereview.com/images/rating/discs_sm_3.png",
            course_photo_url_thumb:
              "https://www.dgcoursereview.com/course_pics/4726/860cb07b_t.jpg",
            course_photo_url_medium:
              "https://www.dgcoursereview.com/course_pics/4726/860cb07b_m.jpg",
            course_photo_hole: "3",
            course_photo_caption: "Hole #3 Tee",
          },
          {
            course_id: "10562",
            name: "Eiðsvöllur",
            holes: "5",
            city: "Eiðsvöllur",
            state: "0",
            country: "Iceland",
            zipcode: "",
            latitude: "65.686300",
            longitude: "-18.090400",
            street_addr: "",
            reviews: "1",
            rating: "3.00",
            private: "0",
            paytoplay: "0",
            tee_1_clr: "FF0000",
            tee_2_clr: "FFFFFF",
            tee_3_clr: "0000CC",
            tee_4_clr: "FFCC00",
            dgcr_url: "https://www.dgcoursereview.com/course.php?id=10562",
            dgcr_mobile_url: "https://www.dgcoursereview.com/mobile/course.php?id=10562",
            rating_img: "https://www.dgcoursereview.com/images/rating/discs_3.png",
            rating_img_small: "https://www.dgcoursereview.com/images/rating/discs_sm_3.png",
            course_photo_url_thumb:
              "https://www.dgcoursereview.com/course_pics/10562/48b96c0e_t.jpg",
            course_photo_url_medium:
              "https://www.dgcoursereview.com/course_pics/10562/48b96c0e_m.jpg",
            course_photo_hole: "2",
            course_photo_caption: "Hole #2 Tee",
          },
        ],
      };
    },
  };
</script>
