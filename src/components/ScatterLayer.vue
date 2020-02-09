<template>
  <l-feature-group>
      <l-geo-json :geojson="geojson" :options="options"/>
  </l-feature-group>
</template>

<script>
  import {
    LFeatureGroup,
    LGeoJson,
  } from 'vue2-leaflet'
  import {
    circleMarker,
    canvas,
    // divIcon,
    // marker
  } from 'leaflet';
  import chroma from "chroma-js"
  import * as tf from '@tensorflow/tfjs'

  const myRenderer = canvas({ padding: 0.5 });

  export default {
    name: "ScatterLayer",
    props: ["layer", "indexLayer"],
    components: {
      LFeatureGroup,
      LGeoJson,
    },
    computed: {
      geojson: function() {
        return {
          type: "FeatureCollection",
          features: this.points.map((x, index) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: x
              },
              properties: {
                style: {
                  radius: this.cRadius[index],
                  fillColor: this.cFillColor[index],
                  fillOpacity: this.cFillOpacity[index],
                  weight: this.cWeight[index],
                  color: this.cColor[index],
                  opacity: this.cOpacity[index],
                },
                text: "Point " + index
              },
              id: index
            }
          })
        }
      },
      options: function() {
        return {
          style: function(feature) {
            return feature.properties && feature.properties.style;
          },
          // pointToLayer: function(feature, latlng) {
          //   const s = feature.properties.style
          //   let svgString = '<svg width="'+s.radius+'" height="'+s.radius+'" xmlns="http://www.w3.org/2000/svg"><circle fill-opacity="'+s.fillOpacity+'" fill="'+s.fillColor+'" cx="'+s.radius/2+'" cy="'+s.radius/2+'" r="'+s.radius/2+'"/></svg>'
          //   return marker(latlng,
          //     {
          //       icon: divIcon({
          //         html: svgString,
          //         iconSize: [s.radius, s.radius],
          //         iconAnchor: [s.radius/2, s.radius/2]      
          //       }),
          //       // id: i
          //     }
          //   )
          // },
          pointToLayer: function(feature, latlng) {
            return circleMarker(
              latlng,
              {...feature.properties.style, renderer:myRenderer}
            ).bindTooltip("<b>" + feature.properties.text + "</b>");
          },
        }
      },
      cRadius: function() {
        const p = this.points
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
        if (l.fixedRadius) {
          return tf.fill([p.length], l.radius).dataSync()
        } else if (l.radiusBase && d[l.radiusBase]) {
          const t = tf.tensor1d(d[l.radiusBase])
          const r = tf.add(
            l.radius[0],
            tf.mul(
              l.radius[1] - l.radius[0],
              tf.sqrt(tf.div(t, t.max()))
            )
          ).dataSync()
          return r
        } else {
          return tf.fill([p.length], l.radius[1]).dataSync()
        }
      },
      cFillColor: function() {
        const p = this.points
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
        if (l.fixedFillColor) {
          return new Array(p.length).fill(l.fillColor)
        } else if (l.fillColorBase && d[l.fillColorBase]) {
          const scale = chroma.scale(l.fillColorscale).domain([Math.min(...d[l.fillColorBase]), Math.max(...d[l.fillColorBase])])
          // .limits(d[l.fillColorBase], "e", )
          return d[l.fillColorBase].map((x) => scale(x).css())
        } else {
          return new Array(p.length).fill(l.fillColorscale[l.fillColorscale.length - 1])
        }
      },
      cWeight: function() {
        const p = this.points
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
        if (l.fixedWeight) {
          return new Array(p.length).fill(l.weight)
        } else if (l.weightBase && d[l.weightBase]) {
          return d[l.weightBase].map((x) => Math.sqrt(x / Math.max(...d[l.weightBase])) * (l.weight[1] - l.weight[0]) + l.weight[0])
        } else {
          return new Array(p.length).fill(l.weight[1])
        }
      },
      cColor: function() {
        const p = this.points
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
        if (l.fixedColor) {
          return new Array(p.length).fill(l.color)
        } else if (l.colorBase && d[l.colorBase]) {
          const scale = chroma.scale(l.colorscale).domain([Math.min(...d[l.colorBase]), Math.max(...d[l.colorBase])])
          // .limits(d[l.colorBase], "e", )
          return d[l.colorBase].map((x) => scale(x).css())
        } else {
          return new Array(p.length).fill(l.colorscale[l.colorscale.length - 1])
        }
      },
      cFillOpacity: function() {
        const p = this.points
        const l = this.layer
        return new Array(p.length).fill(l.fillOpacity)
      },
      cOpacity: function() {
        const p = this.points
        const l = this.layer
        return new Array(p.length).fill(l.opacity)
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
          points.push([d[l.lngField][i], d[l.latField][i]])
        }
        return points
      }
    }
  }
</script>