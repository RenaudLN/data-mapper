<template>
  <div id="sidebar">
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
        <scatter-options />
      </div>
    </div>
  </div>
</template>

<script>
import ScatterOptions from "./ScatterOptions.vue"

export default {
  name: "Sidebar",
  components: {
    ScatterOptions
  },
  data () {
    return {
      tabs: ["layer-options", "map-options", "filter-options"],
      activeTab: "layer-options",
    }
  }
}
</script>

<style scoped>
  #sidebar {
    position: fixed;
    top: .5em;
    bottom: .5em;
    left: .5em;
    width: 250px;
    background-color: #fafafa;
    z-index: 500;
    text-align: left;
    display: flex;
    flex-direction: column;
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
    overflow: auto;
    flex: 1 1 auto;
    background-color: #fff;
  }
</style>