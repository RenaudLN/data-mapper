<template>
  <div id="scatter-options">

    <div class="card-section" is="v-collapse-wrapper" :active="true">
      <div class="section-title" v-collapse-toggle>Required</div>
      <div v-collapse-content>
        <span class="form-label">Latitude*</span>
        <cool-select :items="fields" v-model="latField" item-value="name" item-text="name" placeholder="Select one..." />
        <span class="form-label">Longitude*</span>
        <cool-select :items="fields" v-model="lngField" item-value="name" item-text="name" placeholder="Select one..."/>
      </div>
    </div>

    <div class="card-section" is="v-collapse-wrapper">
      <div class="section-title" v-collapse-toggle>Fill</div>
      <div v-collapse-content>
        <span class="form-label">Size</span>
        <switcher @switch="handleRadiusBase" />
        <vue-slider :min="0" :max="100" v-model="radius" :lazy="true" />
        <template v-if="!fixedRadius">
          <span class="form-label">Size Based On</span>
          <cool-select :items="fields" v-model="radiusBase" item-value="name" item-text="name" placeholder="Select one..."/>
        </template>
        <span class="form-label">Color</span>
        <switcher @switch="fixedFillColor = !$event" />
        <template v-if="fixedFillColor">
          <color-picker :name="'fillColorPicker' + indexLayer" :value="fillColor" @pick-color="fillColor = $event" />
        </template>
        <template v-else>
          <color-scale @pick-colorscale="fillColorscale = $event.colors; fillColorscaleName=$event.name" :scale-name="fillColorscaleName"/>
          <span class="form-label">Color Based On</span>
          <cool-select :items="fields" v-model="fillColorBase" item-value="name" item-text="name" placeholder="Select one..."/>
        </template>
        <span class="form-label">Opacity</span>
        <vue-slider :min="0" :max="1" :interval="0.1" v-model="fillOpacity" :lazy="true" />
      </div>
    </div>

    <div class="card-section" is="v-collapse-wrapper">
      <div class="section-title" v-collapse-toggle>Outline</div>
      <div v-collapse-content>
        <span class="form-label">Width</span>
        <switcher @switch="handleWeightBase" />
        <vue-slider :min="0" :max="20" :interval="0.2" v-model="weight" :lazy="true" />
        <template v-if="!fixedWeight">
          <span class="form-label">Width Based On</span>
          <cool-select :items="fields" v-model="weightBase" item-value="name" item-text="name" placeholder="Select one..."/>
        </template>

        <template v-if="!fixedWeight || weight > 0">
          <span class="form-label">Color</span>
          <switcher @switch="fixedColor = !$event" />
          <template v-if="fixedColor">
            <color-picker :name="'colorPicker' + indexLayer" :value="color" @pick-color="color = $event" />
          </template>
          <template v-else>
            <color-scale @pick-colorscale="colorscale = $event.colors; colorscaleName=$event.name" :scale-name="colorscaleName"/>
            <span class="form-label">Color Based On</span>
            <cool-select :items="fields" v-model="colorBase" item-value="name" item-text="name" placeholder="Select one..."/>
          </template>

          <span class="form-label">Opacity</span>
          <vue-slider :min="0" :max="1" :interval="0.1" v-model="opacity" :lazy="true" />
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import { CoolSelect } from 'vue-cool-select'
import ColorPicker from './ColorPicker.vue'
import Switcher from './Switcher.vue'
import ColorScale from './ColorScale.vue'

export default {
  name: "GeoPieOptions",
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
    fixedWeight: {      
      get: function() {
        return this.$store.state.layers[this.indexLayer].fixedWeight
      },
      set: function(fixedWeight) {
        this.$store.commit("setScatterFixedWeight", {indexLayer: this.indexLayer, fixedWeight: fixedWeight})
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
    weightBase: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].weightBase
      },
      set: function(weightBase) {
        this.$store.commit("setScatterWeightBase", {indexLayer: this.indexLayer, weightBase: weightBase})
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
    fillColorscaleName: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].fillColorscaleName
      },
      set: function(fillColorscaleName) {
        this.$store.commit("setScatterFillColorscaleName", {indexLayer: this.indexLayer, fillColorscaleName: fillColorscaleName})
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
    fixedColor: {      
      get: function() {
        return this.$store.state.layers[this.indexLayer].fixedColor
      },
      set: function(fixedColor) {
        this.$store.commit("setScatterFixedColor", {indexLayer: this.indexLayer, fixedColor: fixedColor})
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
    colorscale: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].colorscale
      },
      set: function(colorscale) {
        this.$store.commit("setScatterColorscale", {indexLayer: this.indexLayer, colorscale: colorscale})
      }
    },
    colorscaleName: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].colorscaleName
      },
      set: function(colorscaleName) {
        this.$store.commit("setScatterColorscaleName", {indexLayer: this.indexLayer, colorscaleName: colorscaleName})
      }
    },
    colorBase: {
      get: function() {
        return this.$store.state.layers[this.indexLayer].colorBase
      },
      set: function(colorBase) {
        this.$store.commit("setScatterColorBase", {indexLayer: this.indexLayer, colorBase: colorBase})
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
    handleWeightBase: function (event) {
      this.fixedWeight = !event
      if (event) {
        this.weight = [0, this.weight]
      } else {
        this.weight = Math.max(...this.weight)
      }
    },
  }
}
</script>