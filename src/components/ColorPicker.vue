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