<template>
  <l-map
    style="height: 100vh; width: 100vw"
    :bounds="bounds"
    :max-bounds="bounds"
  >
    <l-tile-layer :url="url" />
    <div :is="l.type + '-layer'" :layer="l" v-for="(l, i) in layers" :key="i" />
    <l-control :position="'topright'">
      <map-legend :layers="layers"/>
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
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        // zoom: 8,
        // center: [47.413220, 1],
        // markerLatLng: [47.413220, -1.219482],
        bounds: latLngBounds([[60, -180], [-60, 180]])
      };
    },
    computed: {
      layers: function() {
        return this.$store.state.layers
      }
    },
    // mounted () {
    //   const legend = control({position: "bottomcenter"})
    //   legend.onAdd = function() {
    //     let l = DomUtil.create("div", "legend")
    //     l.innerHTML += "<h4>Tegnforklaring</h4>"
    //     // const L = Vue.extend(MapLegend)
    //     // const l = new L({propsData: {layers: this.layers}})
    //     return l
    //   }
    //   legend.addTo(this.$parent.mapObject);
    //   this.$nextTick(() => {
    //     this.$emit('ready', legend);
    //   });
    // },
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