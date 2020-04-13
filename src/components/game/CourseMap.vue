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
    <l-marker :lat-lng="latLng"></l-marker>
  </l-map>
</template>

<script>
  import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
  export default {
    name: "game-course-map",
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    props: {
      lat: {
        type: String,
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        zoom: 12,
        center: [parseFloat(this.lat), parseFloat(this.lng)],
        latLng: [parseFloat(this.lat), parseFloat(this.lng)],
        bounds: null,
        mapStyle: {
          height: "415px",
          width: "100%",
        },
        heightVal: "",
      };
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
