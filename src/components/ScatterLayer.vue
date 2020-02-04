<template>
  <l-feature-group>
      <l-circle-marker
        v-for="(p, index) in points"
        :key="index"
        :radius="layer.fixedRadius?layer.radius:cRadius[index]"
        :weight="layer.weight"
        :color="layer.color"
        :fillColor="layer.fixedFillColor?layer.fillColor:cFillColor[index]"
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
  import chroma from "chroma-js"

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
        const p = this.points
        const l = this.layer
        const r = l.radius
        const d = this.$store.state.datasets[l.dataset]
        if (l.radiusBase && d[l.radiusBase]) {
          return d[l.radiusBase].map((x) => Math.sqrt(x / Math.max(...d[l.radiusBase])) * (r[1] - r[0]) + r[0])
        } else {
          return new Array(p.length).fill(r[r.length - 1])
        }
      },
      cFillColor: function() {
        const p = this.points
        const l = this.layer
        const c = l.fillColorscale
        const d = this.$store.state.datasets[l.dataset]
        if (l.fillColorBase && d[l.fillColorBase]) {
          const scale = chroma.scale(c).domain([Math.min(...d[l.fillColorBase]), Math.max(...d[l.fillColorBase])])
          // .limits(d[l.fillColorBase], "e", )
          return d[l.fillColorBase].map((x) => scale(x).css())
        } else {
          return new Array(p.length).fill(c[c.length - 1])
        }
      },
      points() {
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