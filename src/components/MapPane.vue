<template>
  <div class="card">
    <div class="card-content">
      <div class="card-title">Map options</div> 
      <div class="card-section">
        <span class="form-label">Style</span>
        <multiselect
          placeholder="Select one..."
          track-by="name"
          label="name"
          :options="styles"
          :searchable="false"
          :allow-empty="false"
          deselect-label=""
          select-label=""
          selected-label=""
          :close-on-select="true"
          :show-labels="true"
          :value="styles.find(x => x.tiles.url === tiles.url)"
          @input="tiles = $event.tiles"
        >
          <template slot="option" slot-scope="props">
            <div class="map-style">
              <img :src="getIconUrl(props.option.name)"/>
              <div>{{props.option.name}}</div>
            </div>
            <!-- {{JSON.stringify(props.option)}} -->
            <!-- <div class="colorscale-container in-select" :style="custom?'display: none;':''">
              <div class="color-div" v-for="(c, i) in props.option.colors" :key="c + i" :style="'background-color: ' + c"/>
            </div> -->
          </template>
        </multiselect>
        <switcher :val="showMapLabels" v-model="showMapLabels" before="" after="Show Map Labels" alignment="unset"/>
        <br/>
        <switcher :val="showMapRelief" v-model="showMapRelief" before="" after="Show Relief" alignment="unset"/>
        <br/>
        <switcher :val="showLegend" v-model="showLegend" before="" after="Show Legend" alignment="unset"/>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Switcher from './Switcher.vue'

const computedFields = [
  "tiles", "showLegend", "showMapLabels", "showMapRelief", 
]

export default {
  name: "MapPane",
  components: {
    Multiselect,
    Switcher,
  },
  data() {
    return {
      styles: [
        {
          name: "Dark",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          },
        },
        {
          name: "Light",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          }
        },
        {
          name: "Satellite",
          tiles: {
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            options: {
              attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
          }
        },
        {
          name: "Toner",
          tiles: {
            url: "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}",
            options: {
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              subdomains: 'abcd',
              minZoom: 0,
              maxZoom: 20,
              ext: 'png'
            }
          }
        },
      ]
    }
  },
  computed: {
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
    getIconUrl(name) {
      return require("../assets/map-styles/"+name+".png")
    }
  },
}
</script>

<style>
  .map-style {
    padding: 0.5em 0;
    display: flex;
  }
  .map-style img {
    height: 60px;
    width: 80px;
    flex: 0 0 auto;
  }
  .map-style div {
    height: 60px;
    line-height: 60px;
    flex: 1 1 auto;
    margin-left: 0.5em;
  }
</style>