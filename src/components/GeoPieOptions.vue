<template>
  <div id="scatter-options">

    <div class="card-section" is="v-collapse-wrapper" :active="true">
      <div class="section-title" v-collapse-toggle>Data Fields</div>
      <div v-collapse-content>
        <span class="form-label">Latitude*</span>
        <multiselect
          placeholder="Select one..."
          track-by="name"
          label="name"
          :options="fields"
          :searchable="false"
          :allow-empty="false"
          deselect-label="✓"
          select-label=""
          selected-label="✓"
          :close-on-select="true"
          :show-labels="true"
          :value="fields.find(x => x.name === latField)"
          @input="latField = $event.name"
        />
        <span class="form-label">Longitude*</span>
        <multiselect
          placeholder="Select one..."
          track-by="name"
          label="name"
          :options="fields"
          :searchable="false"
          :allow-empty="false"
          deselect-label="✓"
          select-label=""
          selected-label="✓"
          :close-on-select="true"
          :show-labels="true"
          :value="fields.find(x => x.name === lngField)"
          @input="lngField = $event.name"
        />
        <span class="form-label">Pie Fields*</span>
        <multiselect
          track-by="name"
          placeholder="Select some..."
          label="name"
          :options="fields"
          :searchable="false"
          :allow-empty="true"
          deselect-label="x"
          select-label="+"
          selected-label="✓"
          :close-on-select="false"
          :multiple="true"          
          :value="fields.filter(x => pieFields.indexOf(x.name) >= 0)"
          @input="pieFields = $event.map(x => x.name)"
        />
        <span class="form-label">Pie Title</span>
        <switcher @switch="showLabels = $event" :initialValue="showLabels" before="Add Labels on Map" />
        <multiselect
          placeholder="Select one..."
          track-by="name"
          label="name"
          :options="fields"
          :searchable="false"
          :allow-empty="true"
          deselect-label="x"
          select-label=""
          selected-label="✓"
          :close-on-select="true"
          :show-labels="true"
          :value="fields.find(x => x.name === pieTitle)"
          @input="pieTitle = $event? $event.name : null"
        />
        <span class="form-label">Unit</span>
        <input type="text" v-model="pieUnit" class="options-input"/>
      </div>
    </div>

    <div class="card-section" is="v-collapse-wrapper">
      <div class="section-title" v-collapse-toggle>Fill</div>
      <div v-collapse-content>
        <span class="form-label">Size</span>
        <switcher @switch="handleRadiusBase" :initialValue="!fixedRadius" before="Based on Total Value" />
        <vue-slider :min="0" :max="100" v-model="radius" :lazy="true" />
        <span class="form-label">Color</span>
        <color-scale @pick-colorscale="handlePickFillColorscale" :scale-name="fillColorscaleName"/>
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
import Multiselect from 'vue-multiselect'
import ColorPicker from './ColorPicker.vue'
import Switcher from './Switcher.vue'
import ColorScale from './ColorScale.vue'

const computedFields = [
  "latField", "lngField", "fixedRadius", "radius", "fixedWeight", "weight", "weightBase",
  "opacity", "fillOpacity", "fillColorscale", "fillColorscaleName",
  "fixedColor", "color", "colorscale", "colorscaleName", "colorBase",
  "pieFields", "pieTitle", "pieUnit", "showLabels",
]

export default {
  name: "GeoPieOptions",
  components: {
    VueSlider,
    CoolSelect,
    ColorPicker,
    Switcher,
    ColorScale,
    Multiselect,
  },
  props: ["indexLayer"],
  computed: {
    testF: function() {
      return this.fields.filter(x => this.pieFields.indexOf(x.name) >= 0)
      // const f = this.fields.filter(x => this.pieFields.indexOf(x.name) >= 0)
      // if (this.pieFields) {
      //   return f
      // }
      // return []
    },
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
      window.console.log('here', event)
      this.fillColorscale = event.colors
      this.fillColorscaleName = event.name
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