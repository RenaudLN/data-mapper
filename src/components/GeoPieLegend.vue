<template>
  <div class="legend-item">
    <div class="legend-item-title" v-if="layer.name.trim() !== ''">{{layer.name}}</div>
    <div class="legend-item-content">
      <ul>
        <li v-for="(f, i) in layer.pieFields" :key="i">
          <div :style="'background-color: ' + layer.fillColorscale[i]" class="color-sample" />
          {{f}}
        </li>
      </ul>
      <div v-if="!layer.fixedRadius">
        <svg :height="2 * layer.radius[1] + 2" :width="2.5 * layer.radius[1]" >
          <g>
            <circle
              :cx="layer.radius[1] + 1" :cy="layer.radius[1] + 1" :r="layer.radius[1]"
              stroke="#000" fill="none" stroke-width="1"
            />
            <circle
              :cx="layer.radius[1] + 1" :cy="2 * layer.radius[1] - minRadius + 1" :r="minRadius"
              stroke="#000" fill="none" stroke-width="1"
            />
            <path :d="'M' + layer.radius[1] + ',1h' + 1.5*layer.radius[1]" stroke="#000" fill="none" stroke-width="1"/>
            <path
              :d="'M' + layer.radius[1] + ','+ 2 * (layer.radius[1] - minRadius + 0.5) +'h' + 1.5*layer.radius[1]"
              stroke="#000" fill="none" stroke-width="1"
            />
          </g>
        </svg>
      </div>
      <div v-if="!layer.fixedRadius">
        <div style="transform: translateY(-50%); white-space: nowrap;">
          {{maxValue}} {{layer.pieUnit}}
        </div>
        <div
          style="transform: translateY(-50%);position: absolute; white-space: nowrap;"
          :style="'top: ' + 2 * (layer.radius[1] - minRadius + 0.5) + 'px'"
        >
          {{minLabel}} {{layer.pieUnit}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: "GeoPieLegend",
    props: ["layer"],
    computed: {
      pieSizeStyle: function() {
        const r = this.layer.radius
        return r.map(r => `width: ${2 * r}px; height: ${2 * r}px`)
      },
      filteredData: function() {
        return this.$store.state.datasets[this.layer.dataset]
      },
      totalValue: function() {
        return this.filteredData[this.layer.latField].map((x, i) => {
          let v = 0
          for (let f of this.layer.pieFields) {
            v += this.filteredData[f][i]
          }
          return v
        })
      },
      maxValue: function() {
        return Math.round(Math.max(...this.totalValue))
      },
      minValue: function() {
        return Math.round(Math.min(...this.totalValue))
      },
      minRadius: function() {
        if (this.layer.radius[0] == 0) {
          const r = Math.sqrt(this.minValue / this.maxValue) * this.layer.radius[1]
          if (this.layer.radius[1] - r >= 7) {
            return r
          }
          return this.layer.radius[0]
        }
        return this.layer.radius[0]
      },
      minLabel: function() {
        if (this.minRadius !== this.layer.radius[0]) {
          return this.minValue
        }
        return 0
      }
    },
  }
</script>