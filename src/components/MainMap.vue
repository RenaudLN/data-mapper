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
    <template v-for="(l, i) in layers">
      <l-circle-marker
        v-for="(p, index) in getPoints(l.dataset)"
        :key="i + '.' + index"
        v-bind="l.options"
        :lat-lng="p"
      >
        <l-tooltip>{{'Point ' + index}}</l-tooltip>
      </l-circle-marker>
    </template>
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
        zoom: 8,
        center: [47.413220, 1],
        markerLatLng: [47.413220, -1.219482],
        bounds: null,
        sampleData: {
          lat: [47, 47.1, 47.2, 47.3],
          lon: [1, 1.1, 1.2, 1.3],
        }
      };
    },
    computed: {
      samplePoints: function () {
        let points = [];
        for (let i = 0; i < this.sampleData.lat.length; i++) {
          points[i] = [this.sampleData.lat[i], this.sampleData.lon[i]]
        }
        return points
      },
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
      getPoints(dataset) {
        return this.$store.getters.points(dataset)
      }
    }
  }
</script>

<style>
  .leaflet-control-zoom {
    display: none !important;
  }
</style>