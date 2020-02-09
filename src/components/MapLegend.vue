<template>
  <div class="legend">
    <div :is="l.type + '-legend'" :layer="l" v-for="(l, i) in layers" :key="i" />
  </div>
</template>

<script>
  import ScatterLegend from './ScatterLegend.vue'
  import GeoPieLegend from './GeoPieLegend.vue'
  export default {
    name: "Legend",
    props: ["layers"],
    components: {ScatterLegend, GeoPieLegend}
  }
</script>

<style>
  .legend {
    min-width: 250px;
    z-index: 999;
    background-color: rgb(255, 255, 255, 0.75);
    padding: 1em 2em;
    text-align: left;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
    color: #000;
    font-weight: 500;
  }
  .legend ul {
    margin: auto 0;
    width: auto;
    padding-right: 0.5em;
  }
  .legend li {
    white-space: nowrap;
  }
  .legend-item-content {
    display: flex;
    flex-direction: row;
  }
  .legend-item-content>* {
    position: relative;
    flex: 1 1 auto;
  }
  .legend-item-content>*:not(:first-child) {
    margin-left: 1em;
  }
  .legend-item-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5em;
  }
  .marker-size {
    border: 2px solid #000;
    border-radius: 100%;
  }
  .marker-size-line {
    border-top: 2px dashed #000;
    box-sizing: border-box;
  }
</style>