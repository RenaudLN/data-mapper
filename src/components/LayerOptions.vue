<template>
  <li class="card" is="v-collapse-wrapper" :active="true">
    <div class="card-content">
      <div class="card-title" v-collapse-toggle>
        <span class="handle">⋮⋮</span>
        <img v-if="visible" src="../assets/visible.svg" @click.stop="visible = !visible"/>
        <img v-else src="../assets/invisible.svg" @click.stop="visible = !visible"/>
        <input v-model="name" @click.stop/>
        <img src="../assets/delete.svg" @click.stop="removeLayer"/>
        <img src="../assets/caret.svg" class="caret"/>
      </div>
      <div v-collapse-content>
        <div />
        <div class="card-section">
          <div class="section-title">Basic</div>
          <span class="form-label">Dataset*</span>
            <multiselect
              placeholder="Select one..."
              track-by="name"
              label="name"
              :options="datasets"
              :searchable="false"
              :allow-empty="false"
              deselect-label="✓"
              select-label=""
              selected-label="✓"
              :close-on-select="true"
              :show-labels="true"
              :value="datasets.find(x => x.name === dataset)"
              @input="dataset = $event.name"
            />
          <span class="form-label">Layer Type*</span>
            <multiselect
              placeholder="Select one..."
              track-by="name"
              label="name"
              :options="layerTypes"
              :searchable="false"
              :allow-empty="false"
              deselect-label="✓"
              select-label=""
              selected-label="✓"
              :close-on-select="true"
              :show-labels="true"
              :value="layerTypes.find(x => x.name === type)"
              @input="type = $event.name"
            />
        </div>
        <div :is="type+'-options'" :index-layer="indexLayer"/>
      </div>
    </div>
  </li>
</template>

<script>
import ScatterOptions from "./ScatterOptions.vue"
import GeoPieOptions from "./GeoPieOptions.vue"
// import { CoolSelect } from "vue-cool-select"
import Multiselect from 'vue-multiselect'

const computedFields = ["name", "dataset", "type", "visible"]

export default {
  name:"LayerOptions",
  components: {
    ScatterOptions,
    GeoPieOptions,
    Multiselect,
    // CoolSelect,
  },
  props: ["indexLayer"],
  data () {
    return {
      layerTypes: ["Scatter", "Geo-Pie", "Hexbin", "Polygon"].map((d) => {return {name: d}})
    }
  },
  computed: {
    visibleIcon: function() {
      return this.visible ? "../assets/visible.svg" : "../assets/invisible.svg"
    },
    datasets: function() {
      return Object.keys(this.$store.state.datasets).map((d) => {return {name: d}})
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
    removeLayer: function () {
      this.$store.commit("removeLayer", this.indexLayer)
    },
  }
}
</script>

<style>
  .card {
    margin: 0.5rem 0 !important;
    box-shadow: none !important;
  }
  span.form-label {
    font-size: 0.75rem;
    /* font-variant: small-caps; */
    text-transform: capitalize;
    margin-top: 12px;
    display: inline-block;
    color: var(--font-2);
    font-weight: 600;
  }
  p.range-field, p.range-field>input {
    margin: 0;
  }
  .card-content {
    padding: 0 !important;
  }
  .card-title {
    line-height: 1.5rem !important;
    display: flex !important;
    padding: 0.25em !important;
    margin: 0 !important;
    position: relative;
    background-color: var(--menu-3);
    font-size: 1.25rem !important;
  }
  .card-title * {
    color: var(--font-1);
  }
  .card-title > input {
    font-size: 1rem !important;
    height: 1.2rem !important;
    margin-bottom: 0;
    margin-left: 0.5em;
    font-weight: 500 !important;
    flex: 1 1 auto;
    min-width: 0;
  }
  .card-title > input:hover {
    background-color: var(--menu-2);
  }
  span.handle {
    /* margin-right: 0.15em; */
    padding: 0 0.1em;
    cursor: move;
    font-size: 0.75em;
  }
  span.handle:hover {
    background-color: rgba(255,255,255,0.2);
  }
  input.options-input {
    font-size: 1rem !important;
    height: 1.2rem !important;
    margin-bottom: 0;
    font-weight: 500 !important;
  }
  input.options-input:hover {
    background-color: #f0f0f0;
  }
  .card-title > img {
    height: 1rem;
    margin-left: 0.5rem;
    margin-top: 0.25rem;
    flex: 0 0 auto;
    opacity: 0.5;
    cursor: pointer;
    filter: invert(1);
  }
  .card-title > img.caret {
    height: 0.75rem;
    margin-top: auto;
    margin-bottom: auto;
  }
  .card-title > img:hover {
    opacity: 1;
  }
  select.browser-default {
    padding: 0;
    height: auto;
  }
  .card-section {
    padding: 0 0.5em 0.5em 0.5em;
    background-color: var(--menu-2);
    border-bottom: 1px solid var(--menu-3);
  }
  /* .card-section:nth-child(odd) {
    background-color: var(--menu-3);
  }
  .card-section:nth-child(even) {
    background-color: var(--menu-1);
  } */
  .section-title {
    color: var(--font-1);
    font-weight: bold;
    font-variant: small-caps;
    padding-top: 0.25em;
    position: relative;
    /* border-top: 1px solid var(--menu-3) */
  }
  .section-title.v-collapse-toggler {
    cursor: pointer;
    margin: 0 -0.5em -0.5em -0.5em;
    padding: 0.25em 0.5em 0.5em 0.5em;
  }
  .section-title.v-collapse-toggler::after {
    font-size: 1rem;
    content: "☰";/*"⋮";*/
    /* float: right; */
    position: absolute;
    right: 0.5em;
    height: 25px;
    line-height: 25px;
  }
  .section-title.v-collapse-toggler:hover {
    /* filter: brightness(0.7); */
    background-color: rgba(0,0,0,0.3);
  }
  .section-title+span.form-label {
    margin-top: 0px;
  }
  .v-collapse-content {
    max-height: 0;
    transition: max-height 0.3s linear;
    overflow: hidden;
    padding: 0;
  }
  .v-collapse-content-end {
    transition: max-height 0.3s linear;
    max-height: 10000px;
    overflow: visible;
  }
</style>