const baseLayerDefaults = {
  name: "Point",
  type: "Scatter",
  dataset: null,

  pieFields: [],
  pieTitle: null,
  pieUnit: '',
  showLabels: false,
}

const scatterLayerDefaults = {
  latField: null,
  lngField: null,
  
  fixedRadius: true,
  radius: 20,
  radiusBase: null,

  fixedFillColor: true,
  customFillColor: false,
  fillColor: "#00f",
  fillColorscaleName: "viridis",
  fillColorscale: [],
  fillReverseScale: false,
  fillColorBase: null,
  fillOpacity: 0.8,

  fixedWeight: true,
  weight: 2,
  weightBase: null,
  

  fixedColor: true,
  customColor: false,
  color: "#000",
  colorscaleName: "greys",
  colorscale: [],
  reverseScale: false,
  colorBase: null,
  opacity: 1,

  //dashArray: "1 4",
}

export {baseLayerDefaults, scatterLayerDefaults}