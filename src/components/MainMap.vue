<template>
  <l-map
    style="height: 100vh; width: 100vw"
    :bounds="bounds"
    :max-bounds="bounds"
    @ready="handleReady"
    @zoom="checkZoom"
    :zoom="zoom"
  >
    <l-tile-layer :url="tiles.url" :options="tiles.options"/>
    <l-tile-layer :url="labelTiles.url" :options="labelTiles.options" v-if="showMapLabels"/>
    <l-tile-layer :url="reliefTiles.url" :options="reliefTiles.options" v-if="showMapRelief"/>
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
    "tiles", "showLegend", "showMapLabels", "showMapRelief",
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
        labelTiles: {
          url: 'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
          // url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png',
          options: {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          },
        },
        reliefTiles: {
          url: 'https://maps.heigit.org/openmapsurfer/tiles/asterh/webmercator/{z}/{x}/{y}.png',
          options: {
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> | Map data  <a href="https://lpdaac.usgs.gov/products/aster_policies">ASTER GDEM</a>, <a href="http://srtm.csi.cgiar.org/">SRTM</a>',
            maxZoom: 18
          },
        },
        bounds: latLngBounds([[90, -180], [-90, 180]]),
        zoom: 1,
        mapObject: null,
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
    methods: {
      handleReady(mapObject) {
        mapObject.options.zoomSnap = 0
        this.mapObject = mapObject
        this.checkZoom({target: {_zoom: this.zoom}})
      },
      checkZoom(zoom) {
        const minZoom = Math.log(window.innerHeight / 256) / Math.log(2)
        this.mapObject.setZoom(Math.max(zoom.target._zoom, minZoom))
      },
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