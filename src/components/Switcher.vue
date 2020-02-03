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
