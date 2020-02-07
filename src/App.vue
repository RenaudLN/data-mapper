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
import "vue-multiselect/dist/vue-multiselect.min.css"

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
  .multiselect.multiselect--above, .multiselect, .multiselect__tags, .multiselect__option, .multiselect__option::after {
    min-height: 22px !important;
  }
  .multiselect__option, .multiselect__option::after {
    padding: 0 12px !important;
    line-height: 22px !important;
  }
  .multiselect__tags {
    padding: 0 40px 0 0 !important;
    border-radius: 2px;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .multiselect__single, .multiselect__placeholder {
    margin: 0 !important;
  }
  .multiselect__select {
    height: 22px;
    width: 28px;
  }
  .multiselect * {
    font-size: 1rem;
  }
  .multiselect--above .multiselect__content-wrapper {
    border-radius: 2px 2px 0 0;
  }
  .multiselect--below .multiselect__content-wrapper {
    border-radius: 0 0 2px 2px;
  }
  .multiselect__tag {
    margin: 2px;
    border-radius: 2px;
  }
  /* .multiselect__tags-wrap {
    display: inline-block;
    line-height: 22px !important;
    height: auto !important;
  } */
</style>
