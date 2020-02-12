<template>
  <l-map
    style="height: 100vh; width: 100vw"
    :bounds="bounds"
    :max-bounds="bounds"
  >
    <l-tile-layer :url="tiles.url" :options="tiles.options"/>
    <div :is="l.type + '-layer'" :layer="l" :indexLayer="i" v-for="(l, i) in visibleLayers" :key="i" />
    <l-control :position="'bottomright'" v-if="showLegend && visibleLayers.length > 0">
      <map-legend :layers="visibleLayers"/>
    </l-control>
    <print-control />
  </l-map>
</template>

<script>
  import {
    LMap,
    LTileLayer,
    LControl
  } from 'vue2-leaflet'
  import {latLngBounds} from 'leaflet'
  import ScatterLayer from './ScatterLayer.vue'
  import GeoPieLayer from './GeoPieLayer.vue'
  import PrintControl from './PrintControl.vue'
  import MapLegend from './MapLegend.vue'
  // import Vue from 'vue'
  import 'leaflet/dist/leaflet.css'

  const computedFields = [
    "tiles", "showLegend"
  ]

  export default {
    name: "MainMap",
    components: {
      LMap,
      LTileLayer,
      ScatterLayer,
      GeoPieLayer,
      PrintControl,
      LControl,
      MapLegend,
    },
    data () {
      return {
        // url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        // url: 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
        // options: {
        //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        //   subdomains: 'abcd',
        //   maxZoom: 19
        // },
        bounds: latLngBounds([[60, -180], [-60, 180]])
      };
    },
    computed: {
      layers: function() {
        return this.$store.state.layers
      },
      visibleLayers: function() {
        return this.$store.state.layers.filter(l => l.visible)
      },
      ...computedFields.reduce((a,b)=> (a[b]={
        get: function() {
          return this.$store.state.mapOptions[b]
        },
        set: function(x) {
          this.$store.commit("setMapOption", {option: b, value: x})
        }
      },a),{}),
    },
  }
</script>

<style>
  .leaflet-control-zoom {
    display: none !important;
  }
  .leaflet-div-icon {
    background: transparent;
    border: none;
  }
</style>