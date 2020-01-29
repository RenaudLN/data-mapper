<template>
  <l-map
    style="height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url" />
    <l-circle-marker :lat-lng="center">
      <l-tooltip direction="bottom">Hey</l-tooltip>
    </l-circle-marker>
  </l-map>
</template>

<script>
  import {LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
  } from 'vue2-leaflet'
  import 'leaflet/dist/leaflet.css'

  export default {
    name: "MainMap",
    components: {
      LMap,
      LTileLayer,
      LCircleMarker,
      LTooltip,
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 3,
        center: [47.413220, -1.219482],
        markerLatLng: [47.413220, -1.219482],
        bounds: null
      };
    },
    methods: {
      zoomUpdated (zoom) {
        this.zoom = zoom;
      },
      centerUpdated (center) {
        this.center = center;
      },
      boundsUpdated (bounds) {
        this.bounds = bounds;
      }
    }
  }
</script>

<style>
  .leaflet-control-zoom {
    display: none !important;
  }
</style>