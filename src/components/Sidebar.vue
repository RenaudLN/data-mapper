<template>
  <div id="sidebar" :class="isHidden ? 'hidden' : ''">
    <div class="title">
      <img src="../assets/logo.svg" />
      Data Mapper
    </div>
    <div id="tabs">
      <div class="tab-container">
        <div
          v-for="(tab, i) in tabs"
          :key="i"
          class="tab tooltip tooltip-bottom tooltip-large"
          :class="activeTab == tab ? 'active' : ''"
          @click="activeTab = tab"
          :data-tooltip="tab"
        >
          <img :src="getIconUrl(tab)" />
        </div>
      </div>
      <vue-custom-scrollbar class="tab-content" :settings="{suppressScrollX: false, wheelSpeed:0.5}">
        <div :is="activeTab + '-pane'" :n-layers="nLayers"/>
      </vue-custom-scrollbar>
    </div>
    <div id="hide-sidebar" @click="toggleSidebar">
      {{hideButtonText}}
    </div>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import LayersPane from "./LayersPane.vue"
import MapPane from "./MapPane.vue"

export default {
  name: "Sidebar",
  components: {
    LayersPane,
    MapPane,
    vueCustomScrollbar,
  },
  data () {
    return {
      tabs: ["layers", "map", "filters"],
      activeTab: "layers",
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
    getIconUrl(name) {
      return require('../assets/' + name + '.svg')
    },
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
    background-color: var(--menu-1);
    z-index: 500;
    text-align: left;
    display: flex;
    flex-direction: column;
    transition: transform linear 0.2s;
  }
  #sidebar.hidden {
    transform: translateX(calc(-100% - var(--base-margin)));
  }
  .title {
    color: #3ED77A;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    font-variant: small-caps;
    flex: 0 0 auto;
    padding: .5em;
    padding-bottom: .25em;
    /* height: 3rem;
    line-height: 3rem;
    box-sizing: content-box; */
  }
  .title > img {
    height: 1.25rem;
    /* filter: invert(1); */
    filter: invert(59%) sepia(55%) saturate(523%) hue-rotate(91deg) brightness(109%) contrast(86%);
    /* opacity: 0.8; */
    /* margin-top: .5rem; */
    margin-bottom: -0.15em;
  }
  #tabs {
    flex: 1 1 auto;
    position: absolute;
    top: 42px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .tab-container {
    display: flex;
    flex: 0 0 auto;
  }
  .tab-container::before, .tab-container::after {
    content: "";
    width: 0.5em;
  }
  .tab {
    flex: 0 0 auto;
    padding: .25em .5em;
    text-align: center;
    cursor: pointer;
    /* background-color: var(--menu-1); */
    border-radius: 2px 2px 0 0;
  }
  .tab > img {
    height: 1rem;
    filter: invert(1);
    opacity: 0.8;
  }
  .tab:hover {
    background-color: rgba(0,0,0,0.2);
    border-bottom: 3px solid var(--font-1);
  }
  .tab:hover > img {
    opacity: 1
  }
  .tab.active {
    border-bottom: 3px solid var(--font-1);
    /* background-color: var(--menu-2); */
  }
  .tab-content {
    padding: 0.5em 1em;
    /* overflow-y: auto;
    overflow-x: hidden; */
    position: relative;
    flex: 1 1 auto;
    background-color: var(--menu-2);
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
    background-color: var(--menu-1);
    transform: translateX(100%) translateX(var(--base-margin));
    cursor: pointer;
  }
</style>