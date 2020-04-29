<template>
  <l-map
    :style="mapStyle"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="courseLatLng"></l-marker>
    <l-marker v-if="!getUserLocationError" :lat-lng="userLatLng"></l-marker>
  </l-map>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
  import { mapGetters } from "vuex";
  export default {
    name: "game-course-map",
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    props: {
      courseLatLng: {
        type: Array,
        required: true,
      },
      userLatLng: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        zoom: 12,
        center: [parseFloat(this.courseLatLng[0]), parseFloat(this.courseLatLng[1])],
        bounds: null,
        mapStyle: {
          height: "390px",
          width: "100%",
        },
        heightVal: "",
      };
    },
    computed: {
      ...mapGetters(["getUserLocationError"]),
    },
    methods: {
      logg() {
        this.heightVal = this.$refs.logObj.clientHeight;
      },
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
    },
  };
</script>
