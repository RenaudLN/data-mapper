<template>
  <div id="sidebar" :class="isHidden ? 'hidden' : ''">
    <div id="title">Data Mapper</div>
    <div id="tabs">
      <div class="tab-container">
        <div
          class="tab"
          :class="activeTab===tab?'active':''" v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
        >
          {{tab}}
        </div>
      </div>
      <div class="tab-content">
        <div :is="activeTab + '-pane'" :n-layers="nLayers"/>
        <!-- <layer-options :index-layer="i-1" v-for="i in nLayers" :key="i"/>
        <button id="add-layer" class="btn" @click="addLayer"><span>+</span><span> Add layer</span></button> -->
      </div>
    </div>
    <div id="hide-sidebar" @click="toggleSidebar">
      {{hideButtonText}}
    </div>
  </div>
</template>

<script>
import LayersPane from "./LayersPane.vue"
import MapPane from "./MapPane.vue"

export default {
  name: "Sidebar",
  components: {
    LayersPane,
    MapPane,
  },
  data () {
    return {
      tabs: ["Layers", "Map", "Filter"],
      activeTab: "Layers",
      isHidden: false,
      hideButtonText: "<"
    }
  },
  computed: {
    nLayers: function () {
      return this.$store.state.layers.length
    },
  },
  methods: {
    toggleSidebar: function() {
      this.isHidden = !this.isHidden;
      if (this.isHidden) {
        this.hideButtonText = ">"
      } else {
        this.hideButtonText = "<"
      }
    },
  }
}
</script>

<style scoped>
  #sidebar {
    position: fixed;
    top: var(--base-margin);
    bottom: var(--base-margin);
    left: var(--base-margin);
    width: var(--sidebar-width);
    background-color: #fafafa;
    z-index: 500;
    text-align: left;
    display: flex;
    flex-direction: column;
    transition: transform linear 0.2s;
  }
  #sidebar.hidden {
    transform: translateX(calc(-100% - var(--base-margin)));
  }
  #title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    font-variant: small-caps;
    flex: 0 0 auto;
    padding: .5em;
    padding-bottom: .25em;
  }
  #tabs {
    flex: 1 1 auto;
    position: relative;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .tab-container {
    display: flex;
    flex: 0 0 auto;
  }
  .tab-container::before, .tab-container::after {
    content: "";
    width: 0.5em;
    border-bottom: 1px solid #ccc;
  }
  .tab {
    flex: 1 1 auto;
    border: 1px solid #ccc;
    padding: .25em;
    text-align: center;
    cursor: pointer;
    background-color: #fafafa;
  }
  .tab.active {
    border-bottom: none;
    background-color: #fff;
  }
  .tab-content {
    padding: 0.5em;
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1 1 auto;
    background-color: #fff;
  }
  #hide-sidebar {
    position: absolute;
    top: 0;
    right: 0;
    height: 24px;
    width: 24px;
    line-height: 24px;
    text-align: center;
    font-weight: bold;
    background-color: #fafafa;
    transform: translateX(100%) translateX(var(--base-margin));
    cursor: pointer;
  }
</style>