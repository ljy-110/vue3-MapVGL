<template>
  <div>
    <div id="map_container" class="map-box" />
  </div>
</template>

<script setup>
// computed,onUnmounted,watch
// import * as mapvgl from 'mapvgl';
import { onMounted } from 'vue';
import mapStyleJson from '@/assets/js/mapStyleJson';
import { bjData } from '../../assets/js/bj_grid';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(116.404000, 39.915221);
  bmapgl.centerAndZoom(point, 11);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });

  var view = new mapvgl.View({
    effects: [
      new mapvgl.BloomEffect({
        threshold: 0.2,
        blurSize: 2.0
      })
    ],
    map: bmapgl
  });

  var result = bjData;
  var data = [];
  for (var i = 0; i < result.length - 1; i++) {
    var line = result[i];
    data.push({
      geometry: {
        type: 'POINT',
        coordinates: [line[1], line[2]]
      },
      properties: {
        count: line[3]
      }
    });
  }

  var whiteLayer = new mapvgl.HeatPointLayer({
    blend: 'lighter',
    style: 'grid',
    shape: 'square',
    size: 1,
    min: 0,
    max: 1000,
    gradient: {
      0: 'rgb(200, 200, 200, 0)',
      0.2: 'rgb(200, 200, 200, 0.5)',
      0.5: 'rgb(200, 200, 200, 0.8)',
      0.51: 'rgb(200, 200, 200, 0)',
      1: 'rgb(200, 200, 200, 0)'
    }
  });
  var yellowLayer = new mapvgl.HeatPointLayer({
    blend: 'lighter',
    style: 'grid',
    size: 4,
    min: 0,
    max: 1000,
    gradient: {
      0: 'rgb(200, 200, 200, 0)',
      0.2: 'rgb(200, 200, 200, 0)',
      0.5: 'rgb(226, 95, 0, 0.9)',
      1: 'rgb(239, 209, 19, 0.9)'
    }

    /*
            gradient: {
                0.0: 'rgb(88, 54, 100, 0.0)',
                0.2: 'rgb(174, 81, 174, 0.0)',
                0.5: 'rgb(225, 108, 30, 0.8)',
                1.0: 'rgb(241, 247, 14, 1.0)',
            }
            */
  });
  view.addLayer(yellowLayer);
  view.addLayer(whiteLayer);
  whiteLayer.setData(data);
  yellowLayer.setData(data);
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>