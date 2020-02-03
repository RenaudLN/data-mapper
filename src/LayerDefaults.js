const baseLayerDefaults = {
  name: "Point",
  type: "Scatter",
  dataset: null,
  latField: null,
  lngField: null,
}

const scatterLayerDefaults = {    
  radius: 20,
  weight: 2,
  color: "#000",
  opacity: 1,
  //dashArray: "1 4",
  fillColor: "#00f",
  fillOpacity: 0.8,
}

export {baseLayerDefaults, scatterLayerDefaults}