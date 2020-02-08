import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {baseLayerDefaults, scatterLayerDefaults} from './LayerDefaults.js'
import { CoolSelectPlugin } from "vue-cool-select"
import VModal from 'vue-js-modal'
import Popover  from 'vue-js-popover'
import VueCollapse from 'vue2-collapse'
import VDialogs from 'v-dialogs'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(CoolSelectPlugin)
Vue.use(VModal)
Vue.use(Popover)
Vue.use(VueCollapse)
Vue.use(VDialogs, {language: "en"})

const N1 = 20
const store = new Vuex.Store({
  state: {
    datasets: {
      "Sample data": {
        lat: Array.from({length: N1}, () => Math.random() * 160 - 80),
        lon: Array.from({length: N1}, () => Math.random() * 360 - 180),
        value: Array.from({length: N1}, () => Math.random() * 10 + 0),
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
        customFillColor: false,
        fillColor: "#00f",
        fillColorscaleName: "Viridis",
        fillColorscale: [],
        fillReverseScale: false,
        fillColorBase: null,

        fillOpacity: 0.8,

        fixedWeight: true,
        weight: 2,
        weightBase: null,
        
      
        fixedColor: true,
        customColor: false,
        color: "#000",
        colorscaleName: "Greys",
        colorscale: [],
        reverseScale: false,
        colorBase: null,

        opacity: 1,

        pieFields: [],
        pieTitle: null,
        pieUnit: '',
        showLabels: false,
      }
    ]
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
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
