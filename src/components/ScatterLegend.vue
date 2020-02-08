<template>
  <div class="legend-item">
    <div class="legend-item-title" v-if="layer.name.trim().length > 0">
      {{layer.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ScatterLegend",
  props: ["layer"],
}
</script>