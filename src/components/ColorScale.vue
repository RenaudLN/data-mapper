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
      :disabled="custom"
    >
      <template slot="option" slot-scope="props">
        <div class="colorscale-container in-select" :style="custom?'display: none;':''">
          <div class="color-div" v-for="(c, i) in props.option.colors" :key="c + i" :style="'background-color: ' + c"/>
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div class="colorscale-container" v-if="!custom">
          <div class="color-div" v-for="(c, i) in props.option.colors" :key="i" :style="'background-color: ' + c"/>
        </div>        
        <div v-else class="flex">
          <draggable
            class="list-group"
            tag="div"
            v-model="customColors"
            v-bind="dragOptions"
            @unchoose="reorder"
            handle=".handle"
          >
            <transition-group type="transition" name="flip-list">
              <div class="color-item" v-for="(c, i) in customColors" :key="c.id">
                <div class="handle tooltip tooltip-top" data-tooltip="Move color">:::</div>
                <color-picker
                  :name="'colorPicker' + id + c.id"
                  :value="c.color" @pick-color="changeColor($event, i)"
                  style="flex: 1 1 auto"
                />
                <div class="delete-color-div tooltip tooltip-top" @click="removeColor(i)" data-tooltip="Remove color">
                ×
                </div>
              </div>
            </transition-group>
          </draggable>
          <div class="add-color-div tooltip tooltip-top" @click="addColor" data-tooltip="Add color">
            <svg width="20" height="20">
              <path d="M10,5V15V10H5H15H10Z" stroke-width="1.5" stroke="#000"/>
            </svg>
          </div>
        </div>
      </template>
    </multiselect>
    <switcher
      :val="custom" v-model="custom"
      alignment="none" before="" after="Custom Palette" style="margin: 0 0 .25em 0"
    />
    <!-- <switcher
      style="margin: 0 0 .25em 0" alignment="none" before="" after="Custom Palette"
      v-model="custom"
    /> -->
      <!-- @switch="toggleCustom" :initialValue="custom" -->
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import Switcher from './Switcher.vue'
import ColorPicker from './ColorPicker.vue'
import {scales} from '../colors.json';
import draggable from 'vuedraggable'

export default {
  name: "ColorScale",
  components: {
    Multiselect,
    Switcher,
    ColorPicker,
    draggable,
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
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
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
    reorder(event) {
      const o = event.oldIndex
      let newPosition = event.originalEvent.target.parentNode
      let n = 0;
      while( (newPosition = newPosition.previousSibling) != null ) 
        n++;
      let l = new Array(this.customColors.length).fill(0).map((x, i) => i)
      l.splice(o, 1)
      l = [...l.slice(0, n), o, ...l.slice(n)]
      this.customColors = l.map(i => this.customColors[i])
    },
    toggleCustom: function(event) {
      window.console.log(event)
      this.custom = event
      if (event) {
        this.customColors = this.colors.map((c, i) => {return {color: c, id: i + this.nextId}})
      }
      // else {
      //   this.pickColorscale()
      // }
    },
    changeColor: function(event, i) {
      let c = [...this.customColors]
      c[i].color = event.hex
      this.customColors = c
    },
    removeColor: function(i) {
      this.customColors.splice(i, 1)
    },
    addColor: function() {
      this.customColors.push({color: '#fff', id: this.nextId})
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
  }
  div.color-div {
    flex: 1 1 auto;
    cursor: pointer;
  }
  .add-color-div {
    font-size: 1rem;
    height: 20px;
    line-height: 20px;
    width: 20px;
    border-radius: 100%;
    text-align: center;
    margin: 1.15em -0.179em 0 0.25em;
    cursor: pointer;
    background-color:rgba(0,0,0,0.1);
    flex: 0 0 auto;
  }
  .add-color-div:hover {
    background-color:rgba(0,0,0,0.2);
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
  .flex {
    display: flex;
  }
  .list-group {
    flex: 1 1 auto;
  }
  .list-group>span {
    display: flex;
    position: relative;
  }
  .color-item {
    flex: 1 1 auto;
    cursor: move;
    position: relative;
  }
  .color-item .handle {
    text-align: center;
    width: 100%;
    font-weight: 700;
    border-radius: 2px;
  }
  .color-item .handle:hover {
    background-color: rgba(0,0,0,0.2)
  }
  .colorscale-select .multiselect__option::after {
    display: none;
  }
  .colorscale-select input[role="combobox"] {
    display: none !important;
  }
  .colorscale-select .multiselect__element {
    margin: 0.1em 0.5em;
  }
  .colorscale-select .multiselect__option {
    padding: 0.4em !important;
    border-radius: 0.2em;
    box-sizing: border-box;
  }
  .colorscale-select .multiselect__option--selected {
    border: 1px solid #333;
  }
  .colorscale-select .multiselect__option--highlight,
  .colorscale-select .multiselect__option--highlight.multiselect__option--selected {
    background-color: rgba(0,0,0,0.25);
  }
  .colorscale-select.multiselect--disabled {
    background: none;
    pointer-events: all;
    opacity: unset;
  }
  .colorscale-select.multiselect--disabled .multiselect__select {
    display: none !important;
  }
  .colorscale-select.multiselect--disabled .multiselect__tags {
    padding-right: 0.5em !important;
  }
  .colorscale-select .multiselect__tags {
    padding: 0.5em 28px 0 0 !important;
  }
  /* .colorscale-select .multiselect__option {
    height: 1em !important;
    min-height: 1em !important;
    line-height: 1em !important;
  }   */
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
</style>