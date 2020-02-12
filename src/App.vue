<template>
  <div id="app">
    <MainMap/>
    <Sidebar/>
    <tooltip :pointer="true" :width="10" position="right" />
  </div>
</template>

<script>
import MainMap from './components/MainMap.vue'
import Sidebar from './components/Sidebar.vue'
import 'vue-slider-component/theme/default.css'
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
    --sidebar-width: 300px;
    --base-margin: 0.5em;
    --theme-color: #4868AF;
    --theme-color-triplet: 72,104,175;
    /* --menu-1: #fafafa;
    --menu-2: #ffffff;
    --menu-3: #e0e0e0; */
    --menu-1: #486470;
    --menu-2: #324851;
    --menu-3: #273034;
    --font-1: #e0e0e0;
    --font-2: #111111;
    /* --theme-color: #26A69A;
    --theme-color-triplet: 38,166,154; */
    /* --theme-color: #5EB88A; */
    /* --theme-color: rgb(235, 10, 54); */
    /* --theme-color-triplet: 235, 10, 54 */
  }
  body {
    margin: 0;
    color: var(--font-1);
  }
  *::selection {
    background-color: #E95E29;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* color: #2c3e50; */
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
  .vue-slider-dot-handle {
    border-radius: 2px;
    background-color: var(--theme-color);
  }
  .vue-slider-dot-tooltip-top {
    top: -5px !important;
    background-color: var(--theme-color);
  }
  .vue-slider-dot-tooltip-inner::after {
    border-top-color: var(--theme-color);
  }
  .vue-slider-process, .vue-slider-dot-tooltip-inner {
    background-color: var(--theme-color);
  }
  .vue-slider-rail {
    min-height: 4px !important;
    background-color: #ccc;
  }
  .multiselect.multiselect--above, .multiselect, .multiselect__tags, .multiselect__option, .multiselect__option::after {
    min-height: 22px !important;
  }
  .multiselect__option, .multiselect__option::after {
    padding: 0 24px 0 12px !important;
    line-height: 22px !important;
    color: var(--font-1);
  }
  .multiselect__option--selected {
    /* color: var(--font-2); */
    background-color: var(--menu-1);
  }
  .multiselect__option--highlight.multiselect__option--selected,
  .multiselect__option--highlight.multiselect__option--selected::after {
    background-color: var(--theme-color);
  }
  .multiselect__option--highlight, .multiselect__option--highlight::after, .multiselect__tag {
    background-color: var(--theme-color);
  }
  .multiselect__tag-icon:hover {
    background-color: rgba(255,255,255,.15);
  }
  .multiselect__tag-icon:after {
    color: var(--theme-color);
    filter: brightness(0.5);
  }
  .multiselect__tag-icon:hover:after {
    filter: none;
  }
  .multiselect__tags {
    background-color: var(--menu-1);
    padding: 0 28px 0 0.5em !important;
    border-radius: 2px;
    border: none;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 3px 5px 2px rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    /* box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
  }
  .multiselect__single, .multiselect__placeholder {
    margin: 0 !important;
    background-color: var(--menu-1);
    color: var(--font-1);
  }
  .multiselect__select {
    height: 100%;
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
  .multiselect__content-wrapper {
    background-color: var(--menu-2);
    border: none;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 3px 5px 2px rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    /* box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); */
  }
  .multiselect__tag {
    margin: 2px;
    border-radius: 2px;
    display: inline-flex;
  }
  .btn.btn-thin {
    height: 24px !important;
    line-height: 24px !important;
    font-size: 1rem;
    text-transform: unset;
    font-variant: small-caps;
  }
  .btn, .btn:hover {
    background-color: var(--theme-color);
  }
  .btn:hover {
    filter: brightness(0.9)
  }
  .tooltip {
    position: relative;
  }
  .tooltip:hover:before {
    content: "";
    position: absolute;
    animation: fadein 0.6s;
    z-index: 999;
    opacity: 0.9;
    pointer-events: none;
  }
  .tooltip:hover:after {
    content: attr(data-tooltip);
    position: absolute;
    width: auto;
    background-color: #333;
    padding: 0.25em 0.5em;
    border-radius: 2px;
    font-size: 0.75em;
    color: #fff;
    white-space: nowrap;
    animation: fadein 0.6s;
    z-index: 999;
    opacity: 0.9;
    pointer-events: none;
  }
  .tooltip.tooltip-top:hover:before {
    border-top: 6px solid #333;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .tooltip.tooltip.tooltip-top:hover:after {
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }
  .tooltip.tooltip-bottom:hover:before {
    border-bottom: 6px solid #333;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .tooltip.tooltip.tooltip-bottom:hover:after {
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
  }
  @keyframes fadein {
  0% {
    opacity:0;
  }
  67% {
    opacity:0;
  }
  100% {
    opacity: 1;
  }
}
br.xs {
  display: block;
  content: "";
  margin-top: 8px;
}
</style>
