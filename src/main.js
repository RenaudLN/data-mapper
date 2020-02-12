import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {baseLayerDefaults, scatterLayerDefaults} from './LayerDefaults.js'
import Popover  from 'vue-js-popover'
import VueCollapse from 'vue2-collapse'
import VDialogs from 'v-dialogs'
import {biogas_pies} from './biogas_pies.json'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Popover, { tooltip: true })
Vue.use(VueCollapse)
Vue.use(VDialogs, {language: "en"})


const store = new Vuex.Store({
  state: {
    datasets: {
      biogas_pies
    },
    layers: [
      {
        name: "Biogas potential",
        type: "Geo-Pie",
        dataset: "biogas_pies",
        latField: "Latitude",
        lngField: "Longitude",
        visible: true,

        fixedRadius: false,
        radius: [10, 40],
        radiusBase: null,

        fixedFillColor: true,
        customFillColor: false,
        fillColor: "#0000ff",
        fillColorscaleName: "Enea",
        fillColorscale: [],
        fillReverseScale: false,
        fillColorBase: null,

        fillOpacity: 1,

        fixedWeight: true,
        weight: 10,
        weightBase: null,
        
      
        fixedColor: true,
        customColor: false,
        color: "#ffffff",
        colorscaleName: "Greys",
        colorscale: [],
        reverseScale: false,
        colorBase: null,

        opacity: 1,

        pieFields: ["Agricole & industrielle", "Micro-méthanisation", "ISDND", "STEP"],
        pieTitle: "Country",
        pieUnit: 'TWh',
        showLabels: true,
        labelOffsets: [],
      }
    ],
    mapOptions: {
      tiles: {
        url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        options: {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      }
    }
  },
  mutations: {
    addLayer (state) {
      // window.console.log('addLayer')
      state.layers.push({
        ...baseLayerDefaults,
        ...scatterLayerDefaults
      })
    },
    removeLayer (state, indexLayer) {
      state.layers.splice(indexLayer, 1)
    },
    setLayerField (state, payload) {
      let {indexLayer, field, value} = payload
      // window.console.log("set layer", indexLayer, "field", field, value)
      state.layers[indexLayer][field] = value
    },
    addDataset (state, payload) {
      // window.console.log("add dataset", payload)
      state.datasets = Object.assign({}, state.datasets, {[payload.name]: payload.data})
    },
    setMapOption (state, payload) {
      state.mapOptions[payload.option] = payload.value
    },
    reorderLayers (state, indices) {
      state.layers = indices.map(i => state.layers[i])
    },
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
