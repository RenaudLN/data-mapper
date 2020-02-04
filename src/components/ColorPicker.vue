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