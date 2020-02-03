import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {baseLayerDefaults, scatterLayerDefaults} from './LayerDefaults.js'
import { CoolSelectPlugin } from "vue-cool-select"
import VModal from 'vue-js-modal'
import Popover  from 'vue-js-popover'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(CoolSelectPlugin)
Vue.use(VModal)
Vue.use(Popover)

const store = new Vuex.Store({
  state: {
    datasets: {
      "Sample data": {
        lat: [47, 47.1, 47.2, 47.3],
        lon: [1, 1.1, 1.2, 1.3],
        value: [10, 2, 5, 8],
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
        radiusBase: null,
        fillColorBase: null,
        radius: [18],
        color: '#000',
        weight: 1,
        fillColor: '#00f',
        fillOpacity: 0.8,
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
    setScatterRadius (state, payload) {
      state.layers[payload.indexLayer].radius = payload.radius
    },
    setScatterRadiusBase (state, payload) {
      state.layers[payload.indexLayer].radiusBase = payload.radiusBase
    },
    setScatterWeight (state, payload) {
      state.layers[payload.indexLayer].weight = payload.weight
    },
    setScatterOpacity (state, payload) {
      state.layers[payload.indexLayer].opacity = payload.opacity
    },
    setScatterFillOpacity (state, payload) {
      state.layers[payload.indexLayer].fillOpacity = payload.fillOpacity
    },
    setScatterFillColor (state, payload) {
      state.layers[payload.indexLayer].fillColor = payload.fillColor
    },
    setScatterColor (state, payload) {
      state.layers[payload.indexLayer].color = payload.color
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
