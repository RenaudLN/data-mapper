import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {baseLayerDefaults, scatterLayerDefaults} from './LayerDefaults.js'
import { CoolSelectPlugin } from "vue-cool-select"
import VModal from 'vue-js-modal'
import Popover  from 'vue-js-popover'
import VueCollapse from 'vue2-collapse'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(CoolSelectPlugin)
Vue.use(VModal)
Vue.use(Popover)
Vue.use(VueCollapse)

const N1 = 100
const store = new Vuex.Store({
  state: {
    datasets: {
      "Sample data": {
        lat: Array.from({length: N1}, () => Math.random() * 2 + 46),
        lon: Array.from({length: N1}, () => Math.random() * 2 + 0),
        value: Array.from({length: N1}, () => Math.random() * 10 + 0),
      },
      "Sample data 2": {
        lat: [47.5, 47.6, 47.7, 47.8, 47.9],
        lon: [1.3, 1.2, 1.1, 1., 0.9],
        tmp: [10, 2, 5, 8, 0],
      },
    },
    layers: [
      {
        name: "Test",
        type: "Scatter",
        dataset: "Sample data",
        latField: "lat",
        lngField: "lon",

        fixedRadius: true,
        radius: 18,
        radiusBase: null,

        fixedFillColor: true,
        fillColor: "#00f",
        fillColorscaleName: "viridis",
        fillColorscale: [],
        fillReverseScale: false,
        fillColorBase: null,

        fillOpacity: 0.8,

        fixedWeight: true,
        weight: 2,
        weightBase: null,
        
      
        fixedColor: true,
        color: "#000",
        colorscaleName: "greys",
        colorscale: [],
        reverseScale: false,
        colorBase: null,

        opacity: 1,
      }
    ]
  },
  mutations: {
    addLayer (state) {
      window.console.log('addLayer')
      state.layers.push({
        ...baseLayerDefaults,
        ...scatterLayerDefaults
      })
    },
    removeLayer (state, indexLayer) {
      state.layers.splice(indexLayer, 1)
    },
    setScatterFixedRadius (state, payload) {
      state.layers[payload.indexLayer].fixedRadius = payload.fixedRadius
    },
    setScatterRadius (state, payload) {
      state.layers[payload.indexLayer].radius = payload.radius
    },
    setScatterRadiusBase (state, payload) {
      state.layers[payload.indexLayer].radiusBase = payload.radiusBase
    },
    setScatterFixedWeight (state, payload) {
      state.layers[payload.indexLayer].fixedWeight = payload.fixedWeight
    },
    setScatterWeight (state, payload) {
      state.layers[payload.indexLayer].weight = payload.weight
    },
    setScatterWeightBase (state, payload) {
      state.layers[payload.indexLayer].weightBase = payload.weightBase
    },
    setScatterOpacity (state, payload) {
      state.layers[payload.indexLayer].opacity = payload.opacity
    },
    setScatterFillOpacity (state, payload) {
      state.layers[payload.indexLayer].fillOpacity = payload.fillOpacity
    },
    setScatterFixedFillColor (state, payload) {
      state.layers[payload.indexLayer].fixedFillColor = payload.fixedFillColor
    },
    setScatterFillColor (state, payload) {
      state.layers[payload.indexLayer].fillColor = payload.fillColor
    },
    setScatterFillColorscale (state, payload) {
      state.layers[payload.indexLayer].fillColorscale = payload.fillColorscale
    },
    setScatterFillColorscaleName (state, payload) {
      state.layers[payload.indexLayer].fillColorscaleName = payload.fillColorscaleName
    },
    setScatterFillColorBase (state, payload) {
      state.layers[payload.indexLayer].fillColorBase = payload.fillColorBase
    },
    setScatterFixedColor (state, payload) {
      state.layers[payload.indexLayer].fixedColor = payload.fixedColor
    },
    setScatterColor (state, payload) {
      state.layers[payload.indexLayer].color = payload.color
    },
    setScatterColorscale (state, payload) {
      state.layers[payload.indexLayer].colorscale = payload.colorscale
    },
    setScatterColorscaleName (state, payload) {
      state.layers[payload.indexLayer].colorscaleName = payload.colorscaleName
    },
    setScatterColorBase (state, payload) {
      state.layers[payload.indexLayer].colorBase = payload.colorBase
    },
    setName (state, payload) {
      state.layers[payload.indexLayer].name = payload.name 
    },
    setDataset (state, payload) {
      state.layers[payload.indexLayer].dataset = payload.dataset 
    },
    setLayerType (state, payload) {
      state.layers[payload.indexLayer].type = payload.type 
    },
    setLatField (state, payload) {
      state.layers[payload.indexLayer].latField = payload.latField 
    },
    setLngField (state, payload) {
      state.layers[payload.indexLayer].lngField = payload.lngField 
    },
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
