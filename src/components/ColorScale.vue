<template>
  <div>
    <multiselect
      class="colorscale-select"
      placeholder="Select one..."
      track-by="name"
      label="name"
      :options="allScales"
      :searchable="false"
      :allow-empty="false"
      deselect-label=""
      select-label=""
      selected-label=""
      :close-on-select="true"
      :show-labels="true"
      :value="allScales.find(x => x.name === sName)"
      @input="sName = $event.name; pickColorscale()"
      v-if="!custom"
    >
      <template slot="option" slot-scope="props">
        <div class="colorscale-container in-select">
          <div class="color-div" v-for="(c, i) in props.option.colors" :key="c + i" :style="'background-color: ' + c"/>
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div class="colorscale-container">
          <div class="color-div" v-for="(c, i) in props.option.colors" :key="i" :style="'background-color: ' + c"/>
        </div>
      </template>
    </multiselect>

    <switcher
      style="margin: 0 0 .25em 0" alignment="none" before="" after="Custom Colors"
      @switch="toggleCustom" :initialValue="custom"
    />
    <div v-if="custom">
      <div style="display: flex">
        <color-picker
          v-for="(c, i) in customColors" :key="c.id" :name="'colorPicker' + id + c.id"
          :value="c.color" @pick-color="changeColor($event, i)"
          style="flex: 1 1 auto"
        />
      </div>
      <div style="display: flex">
        <div class="delete-color-div" v-for="(c, i) in customColors" :key="c.id" @click="removeColor(i)">
          x
        </div>
      </div>
      <div class="add-color-div" @click="addColor">+ Add Color</div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Switcher from './Switcher.vue'
import ColorPicker from './ColorPicker.vue'
import {scales} from '../colors.json';

export default {
  name: "ColorScale",
  components: {
    Multiselect,
    Switcher,
    ColorPicker,
  },
  props: {
    scaleName: {type: String, default: "Viridis"},
    initialColors: {type: Array},
    initialCustom: {type: Boolean, default: false},
  },
  data () {
    return {
      // nColors: 9,
      isContinuous: false,
      sName: this.scaleName,
      custom: this.initialCustom,
      customColors: this.initialColors.map((c, i) => {return {color: c, id: i}}),
      id: String(Math.round(Math.random() * 1000000)),
    }
  },
  computed: {
    allScales: function() {
      return Object.keys(scales).map((x) => {
        return {
          name: x,
          colors: scales[x]
        }
      })
    },
    colors: function() {
      return scales[this.sName]
    },
    nextId: function() {
      return Math.max(0, ...this.customColors.map(x => x.id)) + 1
    },
    customColors2: function() {
      return this.customColors.map(x => x.color)
    }
  },
  created: function() {
    this.pickColorscale()
  },
  watch: {
    customColors: function() {
      this.$emit('pick-colorscale', {colors: this.customColors2, name: this.sName, custom: this.custom})
    },
  },
  methods: {
    toggleCustom: function(event) {
      this.custom = event
      if (event) {
        this.customColors = this.colors.map((c, i) => {return {color: c, id: i + this.nextId}})
      } else {
        this.pickColorscale()
      }
    },
    changeColor: function(event, i) {
      let c = [...this.customColors]
      c[i].color = event.hex
      this.customColors = c
      // this.customColors[i].color = event.hex

      // const cn = Object.assign({}, this.customColors[i], {color: event.hex})
      // window.console.log(cn)
      // this.customColors = this.customColors.map((c, j) => j==i ? c : cn)
    },
    removeColor: function(i) {
      this.customColors.splice(i, 1)
    },
    addColor: function() {
      this.customColors.push({color: '#fff', id:this.nextId})
    },
    pickColorscale: function() {
      if (this.custom) {
        this.$emit('pick-colorscale', {colors: this.customColors2, name: this.sName, custom: this.custom})
      } else {
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

<style>
  .colorscale-select .multiselect__option::after {
    display: none;
  }
  .colorscale-select .multiselect__option {
    height: 1em !important;
    min-height: 1em !important;
    line-height: 1em !important;
  }
</style>