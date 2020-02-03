<template>
  <div id="scatter-options">
    <span class="form-label">Latitude*</span>
    <cool-select :items="fields" v-model="latField" item-value="name" item-text="name"/>

    <span class="form-label">Longitude*</span>
    <cool-select :items="fields" v-model="lngField" item-value="name" item-text="name"/>

    <span class="form-label">Radius</span>
    <vue-slider :min="1" :max="100" v-model="options.radius" @change="updateRadius" :lazy="true" />

    <span class="form-label">Fill Color</span>
    <color-picker :name="'fillColorPicker' + indexLayer" :value="options.fillColor" @pick-color="updateFillColor" />

    <span class="form-label">Fill Opacity</span>
    <vue-slider :min="0" :max="1" :interval="0.1" v-model="options.fillOpacity" @change="updateFillOpacity" :lazy="true" />

    <span class="form-label">Outline Width</span>
    <vue-slider :min="0" :max="20" v-model="options.weight" @change="updateWeight" :lazy="true" />

    <template v-if="options.weight > 0">
      <span class="form-label">Outline Color</span>
      <color-picker :name="'colorPicker' + indexLayer" :value="options.color" @pick-color="updateColor" />

      <span class="form-label">Outline Opacity</span>
      <vue-slider :min="0" :max="1" :interval="0.1" v-model="options.opacity" @change="updateOpacity" :lazy="true" />
    </template>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import { CoolSelect } from 'vue-cool-select'
import ColorPicker from './ColorPicker.vue'

export default {
  name: "ScatterOptions",
  components: {
    VueSlider,
    CoolSelect,
    ColorPicker
  },
  props: ["indexLayer"],
  computed: {    
    fields: function() {
      const dn = this.$store.state.layers[this.indexLayer].dataset
      const d = this.$store.state.datasets[dn]
      if (d===undefined) {return []}
      return Object.keys(d).map((d) => {return {name: d}})
    },
    latField: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].latField
      },
      set: function(latField) {
        this.$store.commit("setLatField", {indexLayer: this.indexLayer, latField: latField})
      }
    },
    lngField: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].lngField
      },
      set: function(lngField) {
        this.$store.commit("setLngField", {indexLayer: this.indexLayer, lngField: lngField})
      }
    },
    options: function() {
      return this.$store.state.layers[this.indexLayer].options
    },
  },
  methods: {
    showModal: function(name) {
      this.$modal.show(name);
    },
    updateRadius: function (radius) {
      this.$store.commit("setScatterRadius", {indexLayer: this.indexLayer, radius: radius})
    },
    updateWeight: function (weight) {
      this.$store.commit("setScatterWeight", {indexLayer: this.indexLayer, weight: weight})
    },
    updateOpacity: function (opacity) {
      this.$store.commit("setScatterOpacity", {indexLayer: this.indexLayer, opacity: opacity})
    },
    updateFillOpacity: function (fillOpacity) {
      this.$store.commit("setScatterFillOpacity", {indexLayer: this.indexLayer, fillOpacity: fillOpacity})
    },
    updateFillColor: function (fillColor) {
      this.$store.commit("setScatterFillColor", {indexLayer: this.indexLayer, fillColor: fillColor.hex})
    },
    updateColor: function (color) {
      this.$store.commit("setScatterColor", {indexLayer: this.indexLayer, color: color.hex})
    },
  }
}
</script>