<template>
  <div class="switch" :style="'float: ' + alignment">
    <label :style="value?'color: #000;':''">
      {{before}}
      <!-- <input type="checkbox" v-model="value" @input="$emit('switch', !value)" /> -->
      <input type="checkbox" :value="val" v-model="checked" @change="emitInput" />
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
    // initialValue: {type: Boolean, default: false},
    value: {type: Boolean},
    val: {type: Boolean},
  },
  data () {
    return {
      checkedProxy: false
    }
  },
  computed: {
    checked: {
      get () {
        return this.value
      },
      set (val) {
        this.checkedProxy = val
      }
    }
  },
  methods: {
    emitInput: function() {
      this.$emit('input', this.checkedProxy)
    }
  },
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
  .switch label input[type=checkbox]:checked+.lever {
    background-color: rgba(var(--theme-color-triplet), 0.3);
  }
  .switch label input[type=checkbox]:checked+.lever:before, .switch label input[type=checkbox]:checked+.lever:after {
    background-color: var(--theme-color);
    left: 10px !important;
  }
</style>