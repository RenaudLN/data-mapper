<template>
  <div class="card">
    <div class="card-content">
      <div class="card-title">
        <input v-model="name"/>
        <img src="../assets/visible.svg" />
        <img src="../assets/delete.svg" @click="removeLayer"/>
      </div>

      <span class="form-label">Dataset*</span>
      <cool-select :items="datasets" v-model="dataset" item-value="name" item-text="name" placeholder="Select one..."/>

      <span class="form-label">Layer Type*</span>
      <cool-select :items="layerTypes" v-model="type" item-value="name" item-text="name" placeholder="Select one..."/>

      <scatter-options :index-layer="indexLayer"/>
    </div>
  </div>
</template>

<script>
import ScatterOptions from "./ScatterOptions.vue"
import { CoolSelect } from "vue-cool-select"

export default {
  name:"LayerOptions",
  components: {
    ScatterOptions,
    CoolSelect,
  },
  props: ["indexLayer"],
  data () {
    return {
      layerTypes: ["Scatter", "Geo-Pie", "Hexbin", "Polygon"].map((d) => {return {name: d}})
    }
  },
  computed: {
    datasets: function() {
      return Object.keys(this.$store.state.datasets).map((d) => {return {name: d}})
    },
    name: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].name
      },
      set: function(name) {
        this.$store.commit("setName", {indexLayer: this.indexLayer, name: name})
      }
    },
    dataset: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].dataset
      },
      set: function(dataset) {
        this.$store.commit("setDataset", {indexLayer: this.indexLayer, dataset: dataset})
      }
    },
    type: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].type
      },
      set: function(type) {
        this.$store.commit("setLayerType", {indexLayer: this.indexLayer, type: type})
      }
    },
  },
  methods: {
    removeLayer: function () {
      this.$store.commit("removeLayer", this.indexLayer)
    },
  }
}
</script>

<style>
  span.form-label {
    font-size: 0.75rem;
    /* font-variant: small-caps; */
    text-transform: capitalize;
    margin-top: 12px;
    display: inline-block;
    color: #009688;
    font-weight: 600;
  }
  p.range-field, p.range-field>input {
    margin: 0;
  }
  .card-content {
    padding: 0.5em !important;
  }
  .card-title {
    line-height: 1.5rem !important;
    display: flex !important;
  }
  .card-title > input {
    font-size: 1.25rem !important;
    height: 1.5rem !important;
    margin-bottom: 0;
    font-weight: 500 !important;
    flex: 1 1 auto;
  }
  .card-title > input:hover {
    background-color: #f0f0f0;
  }
  .card-title > img {
    height: 1rem;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
    flex: 0 0 auto;
    opacity: 0.5;
    cursor: pointer;
  }
  .card-title > img:hover {
    opacity: 1;
  }
  select.browser-default {
    padding: 0;
    height: auto;
  }

</style>