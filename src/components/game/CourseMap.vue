<template>
  <v-container class="pa-0 ma-0 fill-height">
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
  </v-container>
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
    data() {
      return {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        zoom: 10,
        center: [64.128288, -21.827774],
        latLng: [64.118179, -21.888047],
        bounds: null,
        mapStyle: {
          height: "350px",
          width: "100%",
        },
      };
    },
    methods: {
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
