<template>
  <form id="scatter-options">
    <span class="form-label">Radius</span>
    <p class="range-field">
      <input type="range" id="scatter-radius" min="1" max="100" v-model="radius" @change="setRadius"/>
      <!-- <label for="scatter-radius">Radius</label> -->
    </p>
  </form>
</template>

<script>
const ScatterDefaults = {
    radius: 80,
    stroke: true,
    weight: 2,
    color: "#000",
    opacity: 1,
    //dashArray: "1 4",
    fill: true,
    fillColor: "#00f",
    fillOpacity: 0.8,
}
export default {
  name: "ScatterOptions",
  data () {
    return ScatterDefaults
  },
  methods: {
    setRadius: function (event) {
      this.$store.commit("setScatterRadius", {indexLayer: 0, radius:event.target.value})
    }
  }
}
</script>

<style scoped>
  span.form-label {
    font-size: 0.75rem;
    /* font-variant: small-caps; */
    text-transform: capitalize;
  }
  p.range-field, p.range-field>input {
    margin: 0;
  }

</style>