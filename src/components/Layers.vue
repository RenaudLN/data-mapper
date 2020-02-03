<template>
  <div>
    <layer-options :index-layer="i-1" v-for="i in nLayers" :key="i"/>
    <button id="add-layer" class="btn" @click="addLayer"><span>+</span><span> Add layer</span></button>
  </div>
</template>

<script>
import LayerOptions from "./LayerOptions.vue"
export default {
  name: "Layers",
  components: {
    LayerOptions,
  },
  computed: {
    nLayers: function() {
      return this.$store.state.layers.length
    },
  },
  methods: {
    addLayer: function() {
      this.$store.commit("addLayer")
    }
  }
}
</script>

<style scoped>
  #add-layer > span:first-child {
    font-weight: 700;
    font-size: 18px;
    padding-right: 0.5em;
  }
</style>