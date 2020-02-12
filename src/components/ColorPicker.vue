<template>
  <div style="position: relative">
    <div
      class="color-picker tooltip tooltip-top"
      :style="'background-color: ' + color.hex + ';'"
      v-popover.right="{name: name}"
      data-tooltip="Edit color"
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
      color: {hex: this.value}
    }
  },
}
</script>

<style>
.color-picker {
  height: 1em;
  width: 100%;
  cursor: pointer;
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
.vue-popover.dropdown-position-right{
  position: fixed;
  left: calc(var(--sidebar-width) + 2 * var(--base-margin)) !important;
  bottom: 0 !important;
  top: unset !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>