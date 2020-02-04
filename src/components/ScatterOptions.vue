<template>
  <div id="scatter-options">
    <span class="form-label">Latitude*</span>
    <cool-select :items="fields" v-model="latField" item-value="name" item-text="name" placeholder="Select one..." />

    <span class="form-label">Longitude*</span>
    <cool-select :items="fields" v-model="lngField" item-value="name" item-text="name" placeholder="Select one..."/>

    <span class="form-label">Radius</span>
    <switcher @switch="handleRadiusBase" />
    <vue-slider :min="0" :max="100" v-model="radius" :lazy="true" />

    <template v-if="!fixedRadius">
      <span class="form-label">Radius Based On</span>
      <cool-select :items="fields" v-model="radiusBase" item-value="name" item-text="name" placeholder="Select one..."/>
    </template>

    <span class="form-label">Fill Color</span>
    <switcher @switch="fixedFillColor = !$event" />
    <template v-if="fixedFillColor">
      <color-picker :name="'fillColorPicker' + indexLayer" :value="fillColor" @pick-color="fillColor = $event" />
    </template>
    <template v-else>
      <color-scale @pick-colorscale="fillColorscale = $event.colors; scaleName=$event.name" :scale-name="scaleName"/>
      <span class="form-label">Fill Color Based On</span>
      <cool-select :items="fields" v-model="fillColorBase" item-value="name" item-text="name" placeholder="Select one..."/>
    </template>

    <span class="form-label">Fill Opacity</span>
    <vue-slider :min="0" :max="1" :interval="0.1" v-model="fillOpacity" :lazy="true" />

    <span class="form-label">Outline Width</span>
    <vue-slider :min="0" :max="20" v-model="weight" :lazy="true" />

    <template v-if="weight > 0">
      <span class="form-label">Outline Color</span>
      <color-picker :name="'colorPicker' + indexLayer" :value="color" @pick-color="color = $event" />

      <span class="form-label">Outline Opacity</span>
      <vue-slider :min="0" :max="1" :interval="0.1" v-model="opacity" :lazy="true" />
    </template>

  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import { CoolSelect } from 'vue-cool-select'
import ColorPicker from './ColorPicker.vue'
import Switcher from './Switcher.vue'
import ColorScale from './ColorScale.vue'

export default {
  name: "ScatterOptions",
  components: {
    VueSlider,
    CoolSelect,
    ColorPicker,
    Switcher,
    ColorScale,
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
    fixedRadius: {      
      get: function() {
        return this.$store.state.layers[this.indexLayer].fixedRadius
      },
      set: function(fixedRadius) {
        this.$store.commit("setScatterFixedRadius", {indexLayer: this.indexLayer, fixedRadius: fixedRadius})
      }
    },
    radius: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].radius
      },
      set: function(radius) {
        this.$store.commit("setScatterRadius", {indexLayer: this.indexLayer, radius: radius})
      }
    },
    radiusBase: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].radiusBase
      },
      set: function(radiusBase) {
        this.$store.commit("setScatterRadiusBase", {indexLayer: this.indexLayer, radiusBase: radiusBase})
      }
    },
    weight: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].weight
      },
      set: function(weight) {
        this.$store.commit("setScatterWeight", {indexLayer: this.indexLayer, weight: weight})
      }
    },
    opacity: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].opacity
      },
      set: function(opacity) {
        this.$store.commit("setScatterOpacity", {indexLayer: this.indexLayer, opacity: opacity})
      }
    },
    fillOpacity: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].fillOpacity
      },
      set: function(fillOpacity) {
        this.$store.commit("setScatterFillOpacity", {indexLayer: this.indexLayer, fillOpacity: fillOpacity})
      }
    },
    fixedFillColor: {      
      get: function() {
        return this.$store.state.layers[this.indexLayer].fixedFillColor
      },
      set: function(fixedFillColor) {
        this.$store.commit("setScatterFixedFillColor", {indexLayer: this.indexLayer, fixedFillColor: fixedFillColor})
      }
    },
    fillColor: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].fillColor
      },
      set: function(fillColor) {
        this.$store.commit("setScatterFillColor", {indexLayer: this.indexLayer, fillColor: fillColor.hex})
      }
    },
    fillColorscale: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].fillColorscale
      },
      set: function(fillColorscale) {
        this.$store.commit("setScatterFillColorscale", {indexLayer: this.indexLayer, fillColorscale: fillColorscale})
      }
    },
    scaleName: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].scaleName
      },
      set: function(scaleName) {
        this.$store.commit("setScatterScaleName", {indexLayer: this.indexLayer, scaleName: scaleName})
      }
    },
    fillColorBase: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].fillColorBase
      },
      set: function(fillColorBase) {
        this.$store.commit("setScatterFillColorBase", {indexLayer: this.indexLayer, fillColorBase: fillColorBase})
      }
    },
    color: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].color
      },
      set: function(color) {
        this.$store.commit("setScatterColor", {indexLayer: this.indexLayer, color: color.hex})
      }
    },
  },
  methods: {
    handleRadiusBase: function (event) {
      this.fixedRadius = !event
      if (event) {
        this.radius = [0, this.radius]
      } else {
        this.radius = Math.max(...this.radius)
      }
    },
  }
}
</script>