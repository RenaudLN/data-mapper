<template>
  <div>
    <button @click="$refs.upload.click()" class="btn btn-thin"><span>+</span><span> Add dataset</span></button>
    <input ref="upload" type="file" @change="handleUpload" style="display: none"/>
    <draggable
      class="layers-list"
      tag="ul"
      v-model="list"
      v-bind="dragOptions"
      @change="reorderLayers"
      handle=".handle"
    >
      <layer-options :index-layer="i" v-for="i in indices" :key="i"/>
    </draggable>
    <button id="add-layer" class="btn btn-thin" @click="addLayer"><span>+</span><span> Add layer</span></button>
  </div>
</template>

<script>
import LayerOptions from "./LayerOptions.vue"
import DataFrame from 'dataframe-js'
import draggable from 'vuedraggable'

export default {
  name: "LayersPane",
  components: {
    LayerOptions,
    draggable,
  },
  props: ["nLayers"],
  data() {
    return {
      dragOptions: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },
      list: new Array(this.nLayers).fill(0).map((x, i) => {return {id: i}})
    }
  },
  computed: {
    indices: function() {
      return new Array(this.nLayers).fill(0).map((x, i) => i)
    }
  },
  methods: {
    addLayer: function() {
      this.$store.commit("addLayer")
    },
    reorderLayers: function(event) {
      const o = event.moved.oldIndex
      const n = event.moved.newIndex
      let newIndices
      if (o >= n) {
        const before = this.indices.slice(0, n)
        const after = this.indices.slice(o + 1)
        const between = this.indices.slice(n, o)
        newIndices = [...before, o, ...between, ...after]
      } else {
        const before = this.indices.slice(0, o)
        const after = this.indices.slice(n + 1)
        const between = this.indices.slice(o+1, n+1)
        newIndices = [...before, ...between, o, ...after]
      }
      this.$store.commit("reorderLayers", newIndices)
    },
    handleUpload: function() {
      let file = this.$refs.upload.files[0];
      if(!file || file.name.slice(file.name.length-4, file.name.length) !== ".csv") {
        this.$dlg.toast('Only csv file type is supported.', {
          messageType: 'error',
          closeTime: 3,
          position: 'topCenter',
        })
        return
      }

      const isNumeric = (x) => !isNaN(x - parseFloat(x)) || String(x).trim() == ""

      const self = this
      DataFrame.fromCSV(file).then(df => {
        const columns = df.listColumns()
        const df2 = df.chain(
          ...columns.map(col => row => row.set(col, Number(isNumeric(row.get(col)))))
        )
        df = df.castAll(columns.map(col => df2.stat.sum(col) / df2.count() > 0.75 ? Number : String))
        self.$store.commit("addDataset", {name: file.name, data: df.toDict()})
        self.$dlg.toast('Dataset was added successfully!', {
          messageType: 'success',
          closeTime: 3,
          position: 'topCenter',
        })
        self.$refs.upload.value = ""
      })
    }
  }
}
</script>

<style scoped>
  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    content: 'Select some files';
    display: inline-block;
    background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
</style>