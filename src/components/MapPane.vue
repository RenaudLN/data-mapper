<template>
  <div class="card">
    <div class="card-content">
      <div class="card-section">
        <span class="form-label">Style</span>
        <multiselect
          placeholder="Select one..."
          track-by="name"
          label="name"
          :options="styles"
          :searchable="false"
          :allow-empty="false"
          deselect-label="✓"
          select-label=""
          selected-label="✓"
          :close-on-select="true"
          :show-labels="true"
          :value="styles.find(x => x.tiles.url === tiles.url)"
          @input="tiles = $event.tiles"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

const computedFields = [
  "tiles",
]

export default {
  name: "MapPane",
  components: {
    Multiselect,
  },
  data() {
    return {
      styles: [
        {
          name: "Dark no Labels",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          }
        },
        {
          name: "Dark",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          }
        },
        {
          name: "Light no Labels",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          }
        },
        {
          name: "Light",
          tiles: {
            url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            options: {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              subdomains: 'abcd',
              maxZoom: 19,
            }
          }
        },
      ]
    }
  },
  computed: {
    ...computedFields.reduce((a,b)=> (a[b]={
      get: function() {
        return this.$store.state.mapOptions[b]
      },
      set: function(x) {
        this.$store.commit("setMapOption", {option: b, value: x})
      }
    },a),{}),
  },
}
</script>