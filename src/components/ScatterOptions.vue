<template>
  <div id="scatter-options">

    <div class="card-section" is="v-collapse-wrapper" :active="true">
      <div class="section-title" v-collapse-toggle>Data Fields</div>
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
        <switcher @switch="handleRadiusBase" :initialValue="!fixedRadius" />
        <vue-slider :min="0" :max="100" v-model="radius" :lazy="true" />
        <template v-if="!fixedRadius">
          <span class="form-label">Size Based On</span>
          <cool-select :items="fields" v-model="radiusBase" item-value="name" item-text="name" placeholder="Select one..."/>
        </template>
        <span class="form-label">Color</span>
        <switcher @switch="fixedFillColor = !$event" :initialValue="!fixedFillColor" />
        <template v-if="fixedFillColor">
          <color-picker :name="'fillColorPicker' + indexLayer" :value="fillColor" @pick-color="fillColor = $event.hex" />
        </template>
        <template v-else>
          <color-scale
            @pick-colorscale="handlePickFillColorscale"
            :scale-name="fillColorscaleName"
            :initial-custom="customFillColor"
            :initial-colors="fillColorscale"
          />
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
        <switcher @switch="handleWeightBase" :initialValue="!fixedWeight" />
        <vue-slider :min="0" :max="20" :interval="0.2" v-model="weight" :lazy="true" />
        <template v-if="!fixedWeight">
          <span class="form-label">Width Based On</span>
          <cool-select :items="fields" v-model="weightBase" item-value="name" item-text="name" placeholder="Select one..."/>
        </template>

        <template v-if="!fixedWeight || weight > 0">
          <span class="form-label">Color</span>
          <switcher @switch="fixedColor = !$event" :initialValue="!fixedColor" />
          <template v-if="fixedColor">
            <color-picker :name="'colorPicker' + indexLayer" :value="color" @pick-color="color = $event.hex" />
          </template>
          <template v-else>
            <color-scale
              @pick-colorscale="handlePickColorscale"
              :scale-name="colorscaleName"
              :initial-custom="customColor"
              :initial-colors="colorscale"
            />
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

const computedFields = [
  "latField", "lngField", "fixedRadius", "radius", "radiusBase", "fixedWeight", "weight", "weightBase",
  "opacity", "fillOpacity", "fixedFillColor", "fillColor", "fillColorscale", "fillColorscaleName", "fillColorBase",
  "fixedColor", "color", "colorscale", "colorscaleName", "colorBase", "customFillColor", "customColor"
]

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
    ...computedFields.reduce((a,b)=> (a[b]={
      get: function() {
        return this.$store.state.layers[this.indexLayer][b]
      },
      set: function(x) {
        this.$store.commit("setLayerField", {indexLayer: this.indexLayer, field: b, value: x})
      }
    },a),{}),
  },
  methods: {
    handlePickFillColorscale: function(event) {
      this.fillColorscaleName = event.name
      this.customFillColor = event.custom
      this.fillColorscale = event.colors
    },
    handlePickColorscale: function(event) {
      this.colorscaleName = event.name
      this.customColor = event.custom
      this.colorscale = event.colors
    },
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