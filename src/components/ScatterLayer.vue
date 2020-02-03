<template>
  <l-feature-group>
      <l-circle-marker
        v-for="(p, index) in getPoints()"
        :key="index"
        :radius="cRadius[index]"
        :weight="layer.weight"
        :color="layer.color"
        :fillColor="layer.fillColor"
        :opacity="layer.opacity"
        :fillOpacity="layer.fillOpacity"
        :lat-lng="p"
      >
        <l-tooltip>{{'Point ' + index}}</l-tooltip>
      </l-circle-marker>
  </l-feature-group>
</template>

<script>
  import {
    LFeatureGroup,
    LCircleMarker,
    LTooltip,
  } from 'vue2-leaflet'

  export default {
    name: "ScatterLayer",
    props: ["layer"],
    components: {
      LFeatureGroup,
      LCircleMarker,
      LTooltip,
    },
    computed: {
      cRadius: function() {
        const p = this.getPoints()
        const r = this.layer.radius
        window.console.log(r)
        const l = this.layer
        if (l.radiusBase) {
          const d = this.$store.state.datasets[l.dataset]
          return d[l.radiusBase].map((x) => Math.sqrt(x / Math.max(...d[l.radiusBase])) * (r[1] - r[0]) + r[0])
        } else {
          return new Array(p.length).fill(r[r.length - 1])
        }
      }
    },
    methods: {
      getPoints() {
        const l = this.layer
        if (!l.dataset || !l.latField || !l.lngField) {
          return []
        }
        const d = this.$store.state.datasets[l.dataset]
        if (!d[l.latField] || !d[l.lngField]) {
          return []
        }
        let points = [];
        for (let i = 0; i < d[l.latField].length; i++) {
          points.push([d[l.latField][i], d[l.lngField][i]])
        }
        return points
      }
    }
  }
</script>