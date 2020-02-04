<template>
  <div>
    <cool-select
      :items="brewerScales"
      v-model="sName"
      item-value="name"
      item-text="name"
      :placeholder="sName?'':'Select one...'"
      class="colorscale-select"
      @select="pickColorscale"
    >
      <template slot="item" slot-scope="{ item: scale }">
        <div class="colorscale-container in-select">
          <div class="color-div" v-for="(c, i) in scale.colors" :key="i" :style="'background-color: ' + c"/>
        </div>
      </template>
      <template slot="selection" slot-scope="{ item: scale }">
        <div class="colorscale-container">
          <div class="color-div" v-for="(c, i) in scale.colors" :key="i" :style="'background-color: ' + c"/>
        </div>
      </template>
    </cool-select>
  </div>
</template>

<script>
import chroma from "chroma-js"
// import * as tf from '@tensorflow/tfjs';
import { CoolSelect } from 'vue-cool-select'

export default {
  name: "ColorScale",
  components: {
    CoolSelect,
  },
  props: {scaleName: {type: String, default: "viridis"}},
  data () {
    return {
      // nColors: 9,
      isContinuous: false,
      sName: this.scaleName,
    }
  },
  computed: {
    brewerScales: function() {
      return Object.keys(chroma.brewer).map((x) => {
        return {
          name: x,
          colors: chroma.brewer[x]
        }
      })
    },
    colors: function() {
      return chroma.brewer[this.sName]
    },
    // colorsBase: function() {
    //   if (this.scaleName !== "Custom") {
    //     return chroma.brewer[this.scaleName]
    //   } else {
    //     return []
    //   }
    // },
  },
  created: function() {
    this.pickColorscale()
  },
  methods: {
    pickColorscale: function() {
      this.$emit('pick-colorscale', {colors: this.colors, name: this.sName})
    }
    // getColors: function(colors, nColors) {
    //   const scale = chroma.scale(colors).classes(nColors)
    //   const t = Array.from(tf.linspace(0, 1, nColors).dataSync())
    //   return t.map((x) => scale(x).css())
    // }
  }
}
</script>

<style>
  div.colorscale-container {
    display:flex;
    height: 1em;
    width: 100%;
    margin: 0.25em;
  }
  .colorscale-select>div>div.IZ-select__input.IZ-select__input--selection-slot {
    padding: 0 !important;
  }
  .colorscale-select input[role="combobox"] {
    display: none !important;
    background-color: #f00
  }
  div.color-div {
    flex: 1 1 auto;
    cursor: pointer;
  }
</style>