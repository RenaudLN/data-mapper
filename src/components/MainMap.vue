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
    <div :is="l.type + '-layer'" :layer="l" v-for="(l, i) in layers" :key="i" />
  </l-map>
</template>

<script>
  import {LMap,
    LTileLayer,
    // LCircleMarker,
    // LTooltip,
  } from 'vue2-leaflet'
  import ScatterLayer from './ScatterLayer.vue'
  import 'leaflet/dist/leaflet.css'

  export default {
    name: "MainMap",
    components: {
      LMap,
      LTileLayer,
      ScatterLayer
    },
    data () {
      return {
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        zoom: 8,
        center: [47.413220, 1],
        markerLatLng: [47.413220, -1.219482],
        bounds: null,
      };
    },
    computed: {
      layers: function() {
        return this.$store.state.layers
      }
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
      },
    }
  }
</script>

<style>
  .leaflet-control-zoom {
    display: none !important;
  }
</style>