const baseLayerDefaults = {
  name: "Point",
  type: "Scatter",
  dataset: null,
}

const scatterLayerDefaults = {
  latField: null,
  lngField: null,
  
  fixedRadius: true,
  radius: 20,
  radiusBase: null,

  fixedFillColor: true,
  fillColor: "#00f",
  scaleName: "viridis",
  fillColorscale: [],
  reversescale: false,
  fillColorBase: null,
  fillOpacity: 0.8,

  weight: 2,
  color: "#000",
  opacity: 1,
  //dashArray: "1 4",
}

export {baseLayerDefaults, scatterLayerDefaults}