<template>
  <li class="card" is="v-collapse-wrapper" :active="true">
    <div class="card-content">
      <div class="card-title" v-collapse-toggle>
        <span class="handle">⋮⋮</span>
        <input v-model="name" @click.stop/>
        <img v-if="visible" src="../assets/visible.svg" @click.stop="visible = !visible"/>
        <img v-else src="../assets/invisible.svg" @click.stop="visible = !visible"/>
        <img src="../assets/delete.svg" @click.stop="removeLayer"/>
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
  }
  span.form-label {
    font-size: 0.75rem;
    /* font-variant: small-caps; */
    text-transform: capitalize;
    margin-top: 12px;
    display: inline-block;
    color: #444;
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
  }
  .card-title > input {
    font-size: 1rem !important;
    height: 1.2rem !important;
    margin-bottom: 0;
    font-weight: 500 !important;
    flex: 1 1 auto;
    min-width: 0;
  }
  .card-title > input:hover {
    background-color: #f0f0f0;
  }
  span.handle {
    color: #000;
    margin-right: 0.15em;
    padding: 0 0.1em;
    cursor: move;
    font-size: 0.75em;
  }
  span.handle:hover {
    background-color: rgba(0,0,0,0.1);
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
  }
  .card-section:nth-child(odd) {
    background-color: #e0e0e0;
  }
  .card-section:nth-child(even) {
    background-color: #fafafa;
  }
  .section-title {
    color: var(--theme-color);
    font-weight: bold;
    font-variant: small-caps;
    padding-top: 0.25em;
    position: relative;
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
    background-color: rgba(0,0,0,0.25)
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