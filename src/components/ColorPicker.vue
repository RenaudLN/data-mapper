<template>
  <div>
    <div
      class="color-picker"
      :style="'background-color: ' + value + ';'"
      v-popover.right="{name: name}"
    />
    <popover :name="name">
      <chrome v-model="color" @input="$emit('pick-color', color)" />
    </popover>
  </div>
</template>

<script>
import { Chrome } from "vue-color"
export default {
  name: "ColorPicker",
  components: {Chrome},
  props: ["name", "value"],
  data() {
    return {
      color: this.value
    }
  }
}
</script>

<style>
.color-picker {
  height: 1em;
  width: 100%;
  cursor: pointer;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.vue-popover.dropdown-position-right{
  position: fixed;
  left: 260px !important;
  bottom: 0 !important;
  top: unset !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>