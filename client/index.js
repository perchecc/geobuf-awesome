import 'ol/ol.css'
import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM'
import { Fill, Stroke, Style } from 'ol/style.js';

const geobuf = require('geobuf')
const Pbf = require('pbf')

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [-13499390.6914, 5534040.8478],
    zoom: 7
  })
})

//GeoJSON
fetch('http://localhost:3000/file/or_tracts')
  .then((resp) => resp.arrayBuffer())
  .then((data) => {
    console.log('pbf数据请求成功');
    var geojson = geobuf.decode(new Pbf(data))
    var vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(geojson, {
        featureProjection: 'EPSG:3857'
      })
    })
    var vectorLayer = new VectorLayer({
      source: vectorSource,
      style: function () {
        return new Style({
          stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        })
      }
    })
    map.addLayer(vectorLayer)
  })