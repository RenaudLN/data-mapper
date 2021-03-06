<template>
  <l-feature-group>
      <l-geo-json :geojson="geojson" :options="options"/>
      <l-geo-json v-if="layer.showLabels" :geojson="geojson" :options="labelOptions"/>
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

  export default {
    name: "GeoPieLayer",
    props: ["layer", "indexLayer"],
    components: {
      LFeatureGroup,
      LGeoJson,
    },
    methods: {
      svgPie: function(valuesObject, s) {
        const values = Object.values(valuesObject);
        let v = tf.tensor([0, ...values])
        let v2 = v.cumsum().div(v.sum()).mul(2 * Math.PI).add(-Math.PI/2)
        const x = tf.cos(v2).mul(100).add(120).dataSync()
        const y = tf.sin(v2).mul(100).add(120).dataSync()
        let svgString = '<svg viewbox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">'
        const t = v.slice([1], [values.length]).div(v.sum()).dataSync()
        if (t.indexOf(1.) > -1) {
          let i = t.indexOf(1)
          svgString += `<g><path d="M120,120V20A100,100 0 0,1 120,220A100,100 0 0,1 120,20z" `
          svgString += `fill="${s.fillColors[i]}" stroke="${s.color}" stroke-width="${s.weight}" `
          svgString += `fill-opacity="${s.fillOpacity}" stroke-opacity="${s.opacity}"/></g>`
        } else {
          for (let i = 0; i < values.length; i++) {
            let flags = "0,1"
            if (t[i] > 0.5) {
              flags = "1,1"
            }
            if (x[i] && y[i]){
              svgString += `<g><path d="M120,120 L${x[i]},${y[i]} A100,100 0 ${flags} ${x[i+1]},${y[i+1]} z" `
              svgString += `fill="${s.fillColors[i]}" stroke="${s.color}" stroke-width="${s.weight}" stroke-linejoin="bevel" `
              svgString += `fill-opacity="${s.fillOpacity}" stroke-opacity="${s.opacity}"></path></g>`
            }
          }
        }
        svgString += '</svg>'
        return svgString
      },
      tooltipPie(p) {
        const keys = Object.keys(p.values)
        const values = Object.values(p.values)
        let tooltip = '<div class="marker-tooltip">'
        if (p.text){
          tooltip += `<div class="marker-tooltip-title">${p.text}</div>`
        }
        tooltip += '<ul>'
        const c = this.layer.fillColorscale
        for (let i = 0; i < values.length; i++) {
          tooltip += `<li><div style="background-color: ${c[i]};" class="color-sample"></div>${keys[i]}: `
          tooltip += values[i] ? `${values[i].toPrecision(3)} ${p.unit}` : ''
          tooltip += '</li>'
        }
        tooltip += '</ul></div>'
        return tooltip
      },
      labelPie(p, offset) {
        if (!offset) { offset = {x: 0, y: 0} }
        const values = Object.values(p.values)
        const totalValue = tf.tensor(values).sum().dataSync()
        let label = '<div style="background-color: rgba(255,255,255,0.75); width: auto; padding: 0.15em 0.5em;'
        label += `transform: translate(calc(-50% + ${offset.x}px), calc(-100% + ${offset.y}px + ${-p.style.radius-2}px));" `
        label += 'class="pie-label">'
        label += p.text ? `${p.text}<br>` : ''
        label += totalValue ? `${Number(totalValue).toPrecision(3)} ${p.unit}` : ''
        label += '</div>'
        return label
      }
    },
    computed: {
      labelOffsets: function() {
        return this.$store.state.layers[this.indexLayer].labelOffsets
      },
      geojson: function() {
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
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
                  fillColors: this.cFillColors,
                  fillOpacity: this.cFillOpacity[index],
                  weight: this.cWeight[index],
                  color: this.cColor[index],
                  opacity: this.cOpacity[index],
                },
                values: l.pieFields.reduce((o, f) => (o[f] = d[f]?d[f][index]:undefined, o), {}),
                text: d[l.pieTitle] ? d[l.pieTitle][index] : null,
                unit: l.pieUnit,
              },
              id: index
            }
          })
        }
      },
      options: function() {
        const svgPie = this.svgPie
        const tooltipPie = this.tooltipPie
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
                  iconAnchor: [s.radius*1.2, s.radius*1.2]
                }),
              }
            ).bindTooltip(tooltipPie(feature.properties))
          },
        }
      },
      labelOptions: function() {
        const labelPie = this.labelPie
        let labelOffsets = this.labelOffsets
        const store = this.$store
        const indexLayer = this.indexLayer
        return {
          style: function(feature) {
            return feature.properties && feature.properties.style;
          },
          pointToLayer: function(feature, latlng) {
            return marker(latlng,
              {
                icon: divIcon({
                  html: labelPie(feature.properties, labelOffsets[feature.id]),
                  iconSize: ["auto", "auto"],
                }),
                draggable: true,
              }
            )
            .on("dragend", function(event) {
              const start = event.sourceTarget._startPos
              const end = event.sourceTarget._newPos
              let newOffsets = [...labelOffsets]
              newOffsets[feature.id] = {x: end.x - start.x, y: end.y - start.y}
              if (labelOffsets[feature.id]) {
                newOffsets[feature.id].x += labelOffsets[feature.id].x
                newOffsets[feature.id].y += labelOffsets[feature.id].y
              }
              store.commit("setLayerField", {indexLayer, field: "labelOffsets", value: newOffsets})
            })
          },
        }
      },
      cRadius: function() {
        const p = this.points
        const l = this.layer
        const d = this.$store.state.datasets[l.dataset]
        if (l.fixedRadius) {
          return tf.fill([p.length], l.radius).dataSync()
        } else if (l.pieFields.length > 0) {
          const totalValue = p.map((x, i) => {
            let v = 0
            for (let f of l.pieFields) {
              v += d[f][i]
            }
            return v
          })
          const t = tf.tensor1d(totalValue)
          const r = tf.sqrt(t.div(t.max())).mul(l.radius[1] - l.radius[0]).add(l.radius[0]).dataSync()
          return r
        } else {
          return tf.fill([p.length], l.radius[1]).dataSync()
        }
      },
      cFillColors: function() {
        return this.layer.fillColorscale
        // const l = this.layer
        // const d = this.$store.state.datasets[l.dataset]
        // const scale = chroma.scale(l.fillColorscale).domain([Math.min(...d[l.fillColorBase]), Math.max(...d[l.fillColorBase])])
        // // .limits(d[l.fillColorBase], "e", )
        // return d[l.fillColorBase].map((x) => scale(x).css())
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

<style>
  .color-sample {
    height: 1em;
    width: 1em;
    display: inline-block;
    margin-right: 1em;
  }
  .marker-tooltip {
    text-align: left;
    padding: 0 1em;
  }
  .marker-tooltip-title {
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
  }
  .pie-label {
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 600;
    cursor: move;
    color: #000;
  }
</style>