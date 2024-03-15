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
import chinalocation from '@/assets/js/chinalocation';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(113.331104, 23.112136);
  bmapgl.centerAndZoom(point, 5);
  // bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });
  // 2. 创建MapVGL图层管理器
  var view = new mapvgl.View({
    map: bmapgl
  });
  var data1 = [];
  var data2 = [];
  var data3 = [];
  for (var i = 0; i < chinalocation[0].length; i++) {
    var geoCoord = chinalocation[0][i].geoCoord;
    data1.push({
      geometry: {
        type: 'Point',
        coordinates: geoCoord
      },
      properties: {
        time: Math.random() * 100
      }
    });
  }
  for (var j = 0; j < chinalocation[1].length; j++) {
    var geoCoord1 = chinalocation[1][j].geoCoord;
    data2.push({
      geometry: {
        type: 'Point',
        coordinates: geoCoord1
      },
      properties: {
        time: Math.random() * 10
      }
    });
  }
  for (var k = 0; k < chinalocation[2].length; k++) {
    var geoCoord2 = chinalocation[2][k].geoCoord;
    data3.push({
      geometry: {
        type: 'Point',
        coordinates: geoCoord2
      },
      properties: {
        time: Math.random() * 10
      }
    });
  }
  view.addLayer(new mapvgl.PointLayer({
    blend: 'lighter',
    shape: 'circle',
    color: 'rgba(255, 77, 77, 0.8)', // 点图层1颜色
    data: data1,
    size: 1
  }));
  view.addLayer(new mapvgl.PointLayer({
    blend: 'lighter',
    shape: 'circle',
    color: 'rgba(255, 204, 0, 0.6)', // 点图层2颜色
    data: data2,
    size: 1.5
  }));
  view.addLayer(new mapvgl.PointLayer({
    blend: 'lighter',
    shape: 'circle',
    color: 'rgba(255, 255, 0, 0.6)', // 点图层3颜色
    data: data3,
    size: 2
  }));
  view.addLayer(new mapvgl.PointTripLayer({
    blend: 'lighter',
    shape: 'circle',
    startTime: 0,
    endTime: 100,
    step: 0.1,
    trailLength: 10,
    color: 'rgba(255, 255, 153, 0.5)', // 点动画图层颜色
    data: data1,
    size: 1.5
  }));
  
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>