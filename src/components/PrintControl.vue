<script>
  import * as Lprint from 'leaflet-easyprint'
  import { easyPrint } from 'leaflet';

  window.console.log(Lprint)

  export default {
    name: 'PrintControl',
    computed: {
      mapObject: function() {
        const h = window.innerHeight
        const w = window.innerWidth
        const ratios = [{h:9, w:16, c:"sixteenNinthClass"}, {h:3, w:4, c:"fourThirdClass"}, {h: 1, w: 1, c:"oneOnethClass"}]
        function getPxHW(r, h, w) {
          if (w / h > r.w / r.h) {
            return {height: h, width: h * r.w / r.h, className: r.c, name: r.w+'/'+r.h}
          } else {
            return {height: w * r.h / r.w, width: w, className: r.c, name: r.w+'/'+r.h}
          }
        }
        return easyPrint({
          title: 'Export Map',
          position: 'topright',
          exportOnly: true,
          filename: "Map",
          sizeModes: ratios.map((r) => getPxHW(r, h, w)),
          hideControlContainer: false,
          hideClasses: [
            "leaflet-control-easyPrint",
            "easyPrintHolder",
            "leaflet-control-easyPrint-button-export",
            "leaflet-control-attribution",
          ]
        })
      }
    },
    mounted () {
      this.mapObject.addTo(this.$parent.mapObject);
      this.$nextTick(() => {
        this.$emit('ready', this.mapObject);
      });
    },
    render () {
      return null;
    }
  };
</script>

<style>
  .easyPrintHolder .oneOnethClass {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M0,0H100V100H0ZM10,10H90V90H10Z" fill-rule="evenodd" /></g></svg>')
  }
  .easyPrintHolder .fourThirdClass {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M0,12.5H100V87.5H0ZM10,22.5H90V77.5H10Z" fill-rule="evenodd" /></g></svg>')
  }
  .easyPrintHolder .sixteenNinthClass {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px"><g><path d="M0,21.875H100V78.125H0ZM10,31.875H90V68.125H10Z" fill-rule="evenodd" /></g></svg>')
  }
</style>