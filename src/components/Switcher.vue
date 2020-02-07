<template>
  <div class="switch" :style="'float: ' + alignment">
    <label :style="value?'color: #000;':''">
      {{before}}
      <input type="checkbox" v-model="value" @input="$emit('switch', !value)" />
      <span class="lever"></span>
      {{after}}
    </label>
  </div>    
</template>

<script>
export default {
  name: "Switcher",
  props: {
    alignment: {type: String, default: "right"},
    before: {type: String, default:"Based on Data"},
    after: {type: String, default:""},
    initialValue: {type: Boolean, default: false},
  },
  data () {
    return {
      value: this.initialValue
    }
  }
}
</script>

<style>
  .switch {
    margin-top: 7px;
  }
  .section-title+span.form-label+.switch {
    margin-top: -2px;
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