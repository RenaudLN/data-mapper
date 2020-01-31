import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    datasets: [
      {
        name: "Sample data",
        lat: [47, 47.1, 47.2, 47.3],
        lon: [1, 1.1, 1.2, 1.3],
        value: [10, 2, 5, 8],
      }
    ],
    layers: [
      {
        type: 'scatter',
        dataset: "Sample data",
        options: {
          radius: 18,
          color: '#000',
          weight: 1,
          fillColor: '#00f',
          fillOpacity: 0.8
        }
      }
    ]
  },
  getters: {
    points: (state) => (dataset) => {
      const d = state.datasets.find((d) => d.name === dataset)
      let points = [];
      for (let i = 0; i < d.lat.length; i++) {
        points.push([d.lat[i] + 0.5, d.lon[i]])
      }
      return points
    }
  },
  mutations: {
    setScatterRadius (state, payload) {
      state.layers[payload.indexLayer].options.radius = payload.radius
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
