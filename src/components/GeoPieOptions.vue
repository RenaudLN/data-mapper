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
          deselect-label="×"
          select-label="+"
          selected-label="✓"
          :close-on-select="false"
          :multiple="true"          
          :value="fields.filter(x => pieFields.indexOf(x.name) >= 0)"
          @input="pieFields = $event.map(x => x.name)"
        />
        <span class="form-label">Pie Title</span>
        <switcher :val="showLabels" v-model="showLabels" before="Add Labels on Map" />
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
        <switcher :val="!fixedRadius" :value="!fixedRadius" @input="handleRadiusBase" before="Based on Total Value"/>
        <vue-slider :min="0" :max="100" v-model="radius" />
        <span class="form-label">Color</span>
        <color-scale
          @pick-colorscale="handlePickFillColorscale"
          :scale-name="fillColorscaleName"
          :initial-custom="customFillColor"
          :initial-colors="fillColorscale"
          :initial-reverse="revFillColorscale"
          :initial-n="fillColorscaleN"
        />
        <span class="form-label">Opacity</span>
        <vue-slider :min="0" :max="1" :interval="0.1" v-model="fillOpacity" />
      </div>
    </div>

    <div class="card-section" is="v-collapse-wrapper">
      <div class="section-title" v-collapse-toggle>Outline</div>
      <div v-collapse-content>
        <span class="form-label">Width</span>
        <switcher :val="!fixedWeight" :value="!fixedWeight" @input="handleWeightBase"/>
        <vue-slider :min="0" :max="20" :interval="0.2" v-model="weight" />
        <template v-if="!fixedWeight">
          <span class="form-label">Width Based On</span>
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
            :value="fields.find(x => x.name === weightBase)"
            @input="weightBase = $event.name"
          />
        </template>

        <template v-if="!fixedWeight || weight > 0">
          <span class="form-label">Color</span>
          <switcher :val="!fixedColor" :value="!fixedColor" @input="fixedColor = !$event"/>
          <template v-if="fixedColor">
            <color-picker :name="'colorPicker' + indexLayer" :value="color" @pick-color="color = $event.hex" />
          </template>
          <template v-else>
            <color-scale
              @pick-colorscale="handlePickColorscale"
              :scale-name="colorscaleName"
              :initial-custom="customColor"
              :initial-colors="colorscale"
              :initial-n="colorscaleN"
            />
            <span class="form-label">Color Based On</span>
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
              :value="fields.find(x => x.name === colorBase)"
              @input="colorBase = $event.name"
            />
          </template>

          <span class="form-label">Opacity</span>
          <vue-slider :min="0" :max="1" :interval="0.1" v-model="opacity" />
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import Multiselect from 'vue-multiselect'
import ColorPicker from './ColorPicker.vue'
import Switcher from './Switcher.vue'
import ColorScale from './ColorScale.vue'

const computedFields = [
  "latField", "lngField", "fixedRadius", "radius", "fixedWeight", "weight", "weightBase",
  "opacity", "fillOpacity", "fillColorscale", "fillColorscaleName",
  "fixedColor", "color", "colorscale", "colorscaleName", "colorBase",
  "pieFields", "pieTitle", "pieUnit", "showLabels", "customFillColor", "customColor",
  "revFillColorscale", "revColorscale", "fillColorscaleN", "colorscaleN",
]

export default {
  name: "GeoPieOptions",
  components: {
    VueSlider,
    ColorPicker,
    Switcher,
    ColorScale,
    Multiselect,
  },
  props: ["indexLayer"],
  data() {
    return {
      test: true
    }
  },
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
      this.revFillColorscale = event.reverse
      this.fillColorscaleN = event.n
    },
    handlePickColorscale: function(event) {
      this.colorscaleName = event.name
      this.customColor = event.custom
      this.revColorscale = event.reverse
      this.colorscaleN = event.n
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