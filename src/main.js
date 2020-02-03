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
        options: {
          radius: 18,
          color: '#000',
          weight: 1,
          fillColor: '#00f',
          fillOpacity: 0.8,
          opacity: 1,
        }
      }
    ]
  },
  mutations: {
    addLayer (state) {
      window.console.log('addLayer')
      state.layers.push({
        ...baseLayerDefaults,
        options: scatterLayerDefaults
      })
    },
    removeLayer (state, indexLayer) {
      window.console.log('removeLayer', indexLayer)
      state.layers.splice(indexLayer, 1)
    },
    setScatterRadius (state, payload) {
      window.console.log('setScatterRadius ', payload)
      state.layers[payload.indexLayer].options.radius = payload.radius
    },
    setScatterWeight (state, payload) {
      window.console.log('setScatterWeight ', payload)
      state.layers[payload.indexLayer].options.weight = payload.weight
    },
    setScatterOpacity (state, payload) {
      window.console.log('setScatterOpacity ', payload)
      state.layers[payload.indexLayer].options.opacity = payload.opacity
    },
    setScatterFillOpacity (state, payload) {
      window.console.log('setScatterFillOpacity ', payload)
      state.layers[payload.indexLayer].options.fillOpacity = payload.fillOpacity
    },
    setScatterFillColor (state, payload) {
      window.console.log('setScatterFillColor ', payload)
      state.layers[payload.indexLayer].options.fillColor = payload.fillColor
    },
    setScatterColor (state, payload) {
      window.console.log('setScatterColor ', payload)
      state.layers[payload.indexLayer].options.color = payload.color
    },
    setName (state, payload) {
      window.console.log('setName ', payload)
      state.layers[payload.indexLayer].name = payload.name 
    },
    setDataset (state, payload) {
      window.console.log('setDataset ', payload)
      state.layers[payload.indexLayer].dataset = payload.dataset 
    },
    setLayerType (state, payload) {
      window.console.log('setLayerType ', payload)
      state.layers[payload.indexLayer].type = payload.type 
    },
    setLatField (state, payload) {
      window.console.log('setLatField ', payload)
      state.layers[payload.indexLayer].latField = payload.latField 
    },
    setLngField (state, payload) {
      window.console.log('setLngField ', payload)
      state.layers[payload.indexLayer].lngField = payload.lngField 
    },
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
