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
    // circleMarker,
    // canvas,
    divIcon,
    marker
  } from 'leaflet';
  import chroma from "chroma-js"
  import * as tf from '@tensorflow/tfjs'
  // const t = tf.fill([10], 2)
  // window.console.log(tf.add(tf.mul(5, tf.sqrt(tf.div(t, t.max()))), 3).dataSync())

  // const myRenderer = canvas({ padding: 0.5 });

  export default {
    name: "GeoPieLayer",
    props: ["layer"],
    components: {
      LFeatureGroup,
      LGeoJson,
    },
    methods: {
      svgPie: function(values, s) {
        const c = this.layer.fillColorscale
        let v = tf.tensor([0, ...values])
        let v2 = v.cumsum().div(v.sum()).mul(2 * Math.PI).add(-Math.PI/2)
        const x = tf.cos(v2).mul(100).add(120).dataSync()
        const y = tf.sin(v2).mul(100).add(120).dataSync()
        let svgString = '<svg viewbox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">'
        const t = v.slice([1], [values.length]).div(v.sum()).dataSync()
        for (let i = 0; i < values.length; i++) {
          let flags = " 0,1 "
          if (t[i] > 0.5) {
            flags = " 1,1 "
          }
          // svgString += '<g><path d="M100,100 L'+x[i]+','+y[i]+' L'+x[i+1]+','+y[i+1]+' z" /></g>'
          svgString += '<g><path d="M120,120 L'+x[i]+','+y[i]+' A100,100 0'+flags+x[i+1]+','+y[i+1]+' z" '
          svgString += 'fill="'+c[i]+'" stroke="'+s.color+'" stroke-width="'+s.weight+'" stroke-linejoin="bevel" '
          svgString += 'fill-opacity="'+s.fillOpacity+'" opacity="'+s.opacity+'" /></g>'
        }
        svgString += '</svg>'
        return svgString
      }
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
                values: [20, 20, 20, 30, 5, 10, 12],
                text: "Point " + index
              },
              id: index
            }
          })
        }
      },
      options: function() {
        const svgPie = this.svgPie
        return {
          style: function(feature) {
            return feature.properties && feature.properties.style;
          },
          pointToLayer: function(feature, latlng) {
            const s = feature.properties.style
            return marker(latlng,
              {
                icon: divIcon({
                  html: svgPie(feature.properties.values, s),
                  iconSize: [s.radius*2*1.2, s.radius*2*1.2],
                  iconAnchor: [s.radius, s.radius]
                }),
              }
            )
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
    },
  }
</script>