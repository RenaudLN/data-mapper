<template>
  <div class="switch">
    <label :style="on?'color: #000;':''">
      <slot name="before">Based on data</slot>
      <input v-model="on" type="checkbox" @input="$emit('switch', !on)">
      <span class="lever"></span>
      <slot name="after"/>
    </label>
  </div>    
</template>

<script>
export default {
  name: "Switcher",
  data () {
    return {
      on: false
    }
  }
}
</script>

<style>
  .switch {
    float: right;
    margin-top: 7px;
  }
  span.lever {
    height: 10px !important;
    width: 24px !important;
    margin: 0 5px !important;
  }
  span.lever::after, span.lever::before {
    height: 14px !important;
    width: 14px !important;
    top: -2px !important;
  }
  .switch label input[type=checkbox]:checked+.lever:before, .switch label input[type=checkbox]:checked+.lever:after {
    left: 10px !important;
  }
</style>