<template>
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

        <v-col v-for="course in tempCoursesList" :key="course.id" cols="12">
          <v-card :color="course.color" ripple>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="" v-text="course.name"></v-card-title>
                <v-card-subtitle>Baskets: {{ course.numbOfBaskets }}</v-card-subtitle>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="course.image"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "new-game",
    data() {
      return {
        tempCoursesList: [
          {
            id: 1,
            name: "Fossvogur",
            location: "Reykjavík",
            numbOfBaskets: "9",
            description:
              "A fairly easy 9 hole course set in a tranquil public park straddling a tiny brook and a collection of ponds dividing the city of Reykjavík and the town of Kópavogur. Featuring moderate elevation changes (notably on hole 3) there are various water hazards and an assortment of wooded OB areas. Although containing only 9 baskets, the experienced player rarely shoots the custom 9 hole layout, opting rather for a modified 18 hole one as featured in the weekly Tuesday league.",
            image: require("@/assets/fossvogur.jpg"),
            color: "#8FAE58",
          },
          {
            id: 2,
            name: "Grafarholt",
            location: "Reykjavík",
            numbOfBaskets: "9",
            description:
              "Located in woodlands, it has the country's longest hole. There is also a driving range. Three tees per hole.",
            image: require("@/assets/grafarholt.jpg"),
            color: "#45651C",
          },
          {
            id: 3,
            name: "Gufunes",
            location: "Reykjavík",
            numbOfBaskets: "18",
            description: "Open area with bushes, small trees and occasional hills.",
            image: require("@/assets/gufunes.jpg"),
            color: "#8FAE58",
          },
          {
            id: 4,
            name: "Klambratún",
            location: "Reykjavík",
            numbOfBaskets: "9",
            description:
              "This is a course that was installed new in July of 2011, it's in the center of Reykjavik in a park and is easy to find. The name of the park is Klambratúni. Great for beginners.",
            image: require("@/assets/klambratun.jpg"),
            color: "#45651C",
          },
          {
            id: 5,
            name: "Laugardalur",
            location: "Reykjavík",
            numbOfBaskets: "10",
            description:
              "This is a short course located in a public park near downtown Reykavík. On each hole there are 2 pin placements, red and white. The white tee pads are concrete while the shorter red ones are grass tee pads.",
            image: require("@/assets/laugardalur.jpg"),
            color: "#8FAE58",
          },
        ],
      };
    },
  };
</script>
