<template>
  <v-content>
    <v-card class="ma-0 pa-0" color="transparent" tile flat>
      <v-toolbar color="primary" flat>
        <v-container class="ma-0 pa-0 d-flex flex-row justify-start align-center full-width">
          <router-link :to="{ name: 'game' }">
            <v-avatar><v-icon>fa-flag-checkered</v-icon></v-avatar>
          </router-link>
          <v-toolbar-title class="headline font-weight-bold">
            {{ "/ " + getCurrentCourse.name }}
          </v-toolbar-title>
        </v-container>
      </v-toolbar>
      <v-card class="ma-0 pa-0 d-flex justify-center" color="secondary" tile flat>
        <v-btn large outlined color="white" class="my-6 primary" @click="playCourse">
          <v-icon class="mr-2">fa-play</v-icon> <span class="font-weight-bold"> Course</span>
        </v-btn>
      </v-card>
      <v-tabs v-model="currentTab" background-color="secondary" color="white" grow>
        <v-tab v-for="tab in tabs" :key="tab" class="white--text">
          <span class="font-weight-bold">{{ tab }}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab" touchless>
        <v-tab-item><course-info :course="getCurrentCourse" :holeSums="holeSums"/></v-tab-item>
        <v-tab-item>
          <course-map
            :course-lat-lng="[getCurrentCourse.latitude, getCurrentCourse.longitude]"
            :user-lat-lng="[getUserLocation.lat, getUserLocation.lng]"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-content>
</template>

<script>
  import CourseInfo from "@/components/game/CourseInfo.vue";
  import CourseMap from "@/components/game/CourseMap.vue";
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "game-course",
    props: {
      path: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        currentTab: null,
        tabs: ["Info", "Map"],
        sums: [0, 0, 0, 0, 0, 0, 0, 0],
        holeSums: [
          { name: "Red", length: 0, parTotal: 0 },
          { name: "White", length: 0, parTotal: 0 },
          { name: "Blue", length: 0, parTotal: 0 },
          { name: "Yellow", length: 0, parTotal: 0 },
        ],
      };
    },
    components: {
      CourseInfo,
      CourseMap,
    },

    created() {
      this.calculateLengthAndTotalPar();
      this.bottomNavHandler(true);
    },
    methods: {
      ...mapActions(["createGame", "defaultRouting", "showBottomNav"]),
      async playCourse() {
        await this.createGame(this.getCurrentCourse.id);
      },
      bottomNavHandler(payload) {
        this.showBottomNav(payload);
      },
      swipe(direction) {
        this.dir = direction;
      },
      //TODO: Move to services
      calculateLengthAndTotalPar() {
        if (this.getCurrentCourse.holes.items.length > 0) {
          this.getCurrentCourse.holes.items.forEach((m) => {
            this.sums[0] += parseInt(m.redLength);
            this.sums[1] += parseInt(m.whiteLength);
            this.sums[2] += parseInt(m.blueLength);
            this.sums[3] += parseInt(m.yellowLength);
            this.sums[4] += parseInt(m.redPar);
            this.sums[5] += parseInt(m.whitePar);
            this.sums[6] += parseInt(m.bluePar);
            this.sums[7] += parseInt(m.yellowPar);
          });
          this.holeSums[0].length = Math.trunc(this.sums[0] * 0.3048);
          this.holeSums[1].length = Math.trunc(this.sums[1] * 0.3048);
          this.holeSums[2].length = Math.trunc(this.sums[2] * 0.3048);
          this.holeSums[3].length = Math.trunc(this.sums[3] * 0.3048);
          this.holeSums[0].parTotal = this.sums[4];
          this.holeSums[1].parTotal = this.sums[5];
          this.holeSums[2].parTotal = this.sums[6];
          this.holeSums[3].parTotal = this.sums[7];
        }
      },
    },
    computed: {
      ...mapGetters(["getCurrentCourse", "getUserLocation", "getGameStatus"]),
    },
    watch: {
      getGameStatus() {
        this.defaultRouting();
      },
    },
  };
</script>
