<template>
  <div id="app">
    <MainMap/>
    <Sidebar/>
  </div>
</template>

<script>
import MainMap from './components/MainMap.vue'
import Sidebar from './components/Sidebar.vue'
// import 'vue-slider-component/theme/material.css'
import 'vue-slider-component/theme/default.css'
import "vue-cool-select/dist/themes/material-design.css"

export default {
  name: 'app',
  components: {
    MainMap,
    Sidebar,
  }
}
</script>

<style>
  :root {
    --sidebar-width: 250px;
    --base-margin: 0.5em;
  }
  body {
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    width: 100vw;
  }
  input[role="combobox"] {
    border-bottom: none !important;
    margin: 0 !important;
    padding: 0 0.5em !important;
    font-size: 1rem !important;
    height: 1.5em !important;
  }
  div.IZ-select__item {
    padding: 0 0.5em !important;
  }
  .IZ-select__item>span {
    font-size: 1rem !important;
  }
  .vue-slider-dot-tooltip-top {
    top: -5px !important;
  }
</style>
