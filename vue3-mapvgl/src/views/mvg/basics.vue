<template>
  <div>
    <div id="map_container" class="map-box" />
  </div>
</template>

<script setup>
// computed,onUnmounted,watch
import * as mapvgl from 'mapvgl';
import { onMounted } from 'vue';
import mapStyleJson from '@/assets/js/mapStyleJson';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(113.331104, 23.112136);
  bmapgl.centerAndZoom(point, 8);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });
  
  // bmapgl.setMinZoom(10) //缩放限制
  // let dist = new BMapGL.DistrictLayer({
  //   name: '(广东省)',
  //   kind: 1,
  //   fillColor: '#618bf8',
  //   strokeColor: '#daeafa',
  //   viewport: true
  // });
  // bmapgl.addDistrictLayer(dist);
  // var b = new BMapGL.Boundary();
  // b.get('广州市', function(rs) {
  //   var hole = new BMapGL.Polygon(rs.boundaries, {
  //     fillColor: '#5679ea',
  //     fillOpacity: 0.1,
  //     strokeColor: '#75aee0',
  //     strokeOpacity: 1,
  //     strokeWeight: 1
  //     // enableEditing: true, // 是否启用线编辑，默认为false
  //   });
  //   bmapgl.addOverlay(hole);
  // });
  var bd = new BMapGL.Boundary();
  bd.get('广东省', function(rs) {
    var count = rs.boundaries.length; // 行政区域的点有多少个
    var pointArray = [];
    for (var i = 0; i < count; i++) {
      var path = [];
      let str = rs.boundaries[i].replace(' ', '');
      let points = str.split(';');
      for (var j = 0; j < points.length; j++) {
        var lng = points[j].split(',')[0];
        var lat = points[j].split(',')[1];
        path.push(new BMapGL.Point(lng, lat));
      }
      var prism = new BMapGL.Prism(path, 30000, {
        topFillColor: '#5679ea',
        topFillOpacity: 0.5,
        sideFillColor: '#5679ea',
        sideFillOpacity: 0.9

      });
      bmapgl.addOverlay(prism);
    }
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