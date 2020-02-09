<template>
  <div>
    <button @click="$refs.upload.click()" class="btn"><span>+</span><span> Add dataset</span></button>
    <input ref="upload" type="file" @change="handleUpload" style="display: none"/>
    <layer-options :index-layer="i-1" v-for="i in nLayers" :key="i"/>
    <button id="add-layer" class="btn" @click="addLayer"><span>+</span><span> Add layer</span></button>
  </div>
</template>

<script>
import LayerOptions from "./LayerOptions.vue"
import DataFrame from 'dataframe-js'

export default {
  name: "LayersPane",
  components: {
    LayerOptions,
  },
  computed: {
    nLayers: function() {
      return this.$store.state.layers.length
    },
  },
  methods: {
    addLayer: function() {
      this.$store.commit("addLayer")
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
  #add-layer > span:first-child {
    font-weight: 700;
    font-size: 18px;
    padding-right: 0.5em;
  }
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