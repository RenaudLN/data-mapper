<template>
  <div>
    <!-- <div>
      {{JSON.stringify(scaleName)}}
      {{JSON.stringify(initialColors)}}
      {{JSON.stringify(initialCustom)}}
    </div> -->
    <cool-select
      :items="brewerScales"
      v-model="sName"
      item-value="name"
      item-text="name"
      :placeholder="sName?'':'Select one...'"
      class="colorscale-select"
      @select="pickColorscale"
      v-if="!custom"
    >
      <template slot="item" slot-scope="{ item: scale }">
        <div class="colorscale-container in-select">
          <div class="color-div" v-for="(c, i) in scale.colors" :key="c + i" :style="'background-color: ' + c"/>
        </div>
      </template>
      <template slot="selection" slot-scope="{ item: scale }">
        <div class="colorscale-container">
          <div class="color-div" v-for="(c, i) in scale.colors" :key="i" :style="'background-color: ' + c"/>
        </div>
      </template>
    </cool-select>
    <switcher
      style="margin: 0 0 .25em 0" alignment="none" before="" after="Custom Colors"
      @switch="toggleCustom" :initialValue="custom"
    />
    <div v-if="custom">
      <div style="display: flex">
        <color-picker
          v-for="(c, i) in customColors" :key="customKeys[i]" :name="'colorPicker' + id + i"
          :value="c" @pick-color="changeColor($event, i)"
          style="flex: 1 1 auto"
        />
      </div>
      <div style="display: flex">
        <div class="delete-color-div" v-for="(c, i) in customColors" :key="customKeys[i]" @click="removeColor(i)">
          x
        </div>
      </div>
      <div class="add-color-div" @click="addColor">+ Add Color</div>
    </div>
  </div>
</template>

<script>
import chroma from "chroma-js"
// import * as tf from '@tensorflow/tfjs';
import { CoolSelect } from 'vue-cool-select'
import Switcher from './Switcher.vue'
import ColorPicker from './ColorPicker.vue'

export default {
  name: "ColorScale",
  components: {
    CoolSelect,
    Switcher,
    ColorPicker,
  },
  props: {
    scaleName: {type: String, default: "viridis"},
    initialColors: {type: Array},
    initialCustom: {type: Boolean, default: false},
  },
  data () {
    return {
      // nColors: 9,
      isContinuous: false,
      sName: this.scaleName,
      custom: this.initialCustom,
      customColors: this.initialColors,
      customKeys: [...Array(this.initialColors.length).keys()],
      id: String(Math.round(Math.random() * 1000000)),
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
  },
  created: function() {
    this.pickColorscale()
  },
  watch: {
    customColors: function() {
      window.console.log("Custom colors changed")
      this.$emit('pick-colorscale', {colors: this.customColors, name: this.sName, custom: this.custom})
    },
    colors: function() {
      window.console.log("Colors:", this.colors)
    }
  },
  methods: {
    toggleCustom: function(event) {
      this.custom = event
      if (event) {
        this.customColors = [...this.colors]
      } else {
        // this.sName = "viridis"
        this.pickColorscale()
      }
      // this.pickColorscale()
    },
    changeColor: function(event, i) {
      let c = [...this.customColors]
      c[i] = event.hex
      this.customColors = c
      // this.pickColorscale()
    },
    removeColor: function(i) {
      this.customKeys.splice(i, 1)
      this.customColors.splice(i, 1)
      // this.pickColorscale()
    },
    addColor: function() {
      this.customKeys.push(Math.max(...this.customKeys) + 1)
      this.customColors.push('#fff')
    },
    pickColorscale: function() {
      window.console.log("Pick Scale: ", this.custom)
      if (this.custom) {
        this.$emit('pick-colorscale', {colors: this.customColors, name: this.sName, custom: this.custom})
      } else {
      // if (this.colors && this.colors.length > 0) {
      //   this.customColors = [...this.colors]
      // }
        this.$emit('pick-colorscale', {colors: this.colors, name: this.sName, custom: this.custom})
      }
    }
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
  .add-color-div {
    font-size: 1rem;
    margin-top: .25em;
    cursor: pointer;
    width: auto;
    padding: .1em 1em;
    border-radius: 2px;
  }
  .add-color-div:hover {
    background-color:rgba(0,0,0,0.2);
    font-weight: 600;
  }
  .delete-color-div {
    flex: 1 1 auto;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
  }
  .delete-color-div:hover {
    background-color:rgba(0,0,0,0.2);
    font-weight: 600;
  }
</style>