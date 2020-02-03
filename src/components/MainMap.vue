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
        v-for="(p, index) in getPoints(i)"
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
      getPoints(indexLayer) {
        const l = this.$store.state.layers[indexLayer]
        if (!l.dataset || !l.latField || !l.lngField) {
          return []
        }
        const d = this.$store.state.datasets[l.dataset]
        if (!d[l.latField] || !d[l.lngField]) {
          return []
        }
        let points = [];
        for (let i = 0; i < d[l.latField].length; i++) {
          points.push([d[l.latField][i], d[l.lngField][i]])
        }
        return points
      }
    }
  }
</script>

<style>
  .leaflet-control-zoom {
    display: none !important;
  }
</style>