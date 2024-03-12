<template>
  <div>
    <div id="map_container" class="map-box" />
  </div>
</template>

<script setup>
// computed,onUnmounted,watch
import * as mapvgl from 'mapvgl';
import { ref, reactive, onMounted } from 'vue';
import mapStyleJson from '@/assets/js/mapStyleJson';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(113.331104, 23.112136);
  bmapgl.centerAndZoom(point, 10);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });
  // bmapgl.setMinZoom(10) //缩放限制

  var b = new BMapGL.Boundary();
  b.get('广州市', function(rs) {
    var hole = new BMapGL.Polygon(rs.boundaries, {
      fillColor: '#5679ea',
      fillOpacity: 0.1,
      strokeColor: '#75aee0',
      strokeOpacity: 1,
      strokeWeight: 1
      // enableEditing: true, // 是否启用线编辑，默认为false
    });
    bmapgl.addOverlay(hole);
  });

  // 2. 创建MapVGL图层管理器
  var view = new mapvgl.View({
    map: bmapgl
  });

  // 3. 创建可视化图层，并添加到图层管理器中
  var layer = new mapvgl.PointLayer({
    color: 'rgba(50, 50, 200, 1)',
    blend: 'lighter',
    size: 2
  });
  view.addLayer(layer);

  // 4. 准备好规范化坐标数据
  var data = [{
    geometry: {
      type: 'Point',
      coordinates: [116.403748, 39.915055]
    }
  }];

  // 5. 关联图层与数据，享受震撼的可视化效果
  layer.setData(data);
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>