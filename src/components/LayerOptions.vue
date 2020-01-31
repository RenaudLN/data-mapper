<template>
  <div class="card">
    <div class="card-content">
      <div class="card-title">
        <input v-model="name" />
        <img src="../assets/visible.svg" />
        <img src="../assets/delete.svg" />
      </div>
      <span class="form-label">Dataset</span>
      <select @change="updateDataset" class="browser-default">
        <option v-for="(d, i) in datasets" :key="i" :value="d">{{d}}</option>
      </select>
      <span class="form-label">Layer Type</span>
      <select @change="updateLayerType" class="browser-default">
        <option v-for="(d, i) in datasets" :key="i" :value="d">{{d}}</option>
      </select>
      <scatter-options />
    </div>
  </div>
</template>

<script>
import ScatterOptions from "./ScatterOptions.vue"

export default {
  name:"LayerOptions",
  components: {ScatterOptions},
  data () {
    return {
      name: "Point"
    }
  },
  computed: {
    datasets: function() {
      return this.$store.state.datasets.map((d) => d.name)
    },
  },
  methods: {
    updateDataset: function (event) {
      this.$store.commit("setDataset", {indexLayer: 0, dataset: event.target.value})
    }
  }
}
</script>

<style>
  span.form-label {
    font-size: 0.75rem;
    /* font-variant: small-caps; */
    text-transform: capitalize;
    margin-top: 1em;
    display: block
  }
  p.range-field, p.range-field>input {
    margin: 0;
  }
  .card-content {
    padding: 0.5em !important;
  }
  .card-title {
    line-height: 1.5rem !important;
    display: flex !important;
  }
  .card-title > input {
    font-size: 1.25rem !important;
    height: 1.5rem !important;
    margin-bottom: 0;
    font-weight: 500 !important;
    flex: 1 1 auto;
  }
  .card-title > input:hover {
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

</style>