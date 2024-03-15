<template>
  <div>
    <div id="map_container" class="map-box" />
  </div>
</template>

<script setup>
// 记得index.html 引入 <script src="//mapv.baidu.com/build/mapv.min.js">
// computed,onUnmounted,watch
import * as mapvgl from 'mapvgl';
import { onMounted } from 'vue';
import mapStyleJson from '@/assets/js/mapStyleJson';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(103.46752, 37.289917);
  bmapgl.centerAndZoom(point, 6);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });
  // bmapgl.setMinZoom(10) //缩放限制
  var data = [];

  var citys = [
    '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
    '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
    '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
    '成都', '贵阳', '昆明', '拉萨', '海口'
  ];
  var randomCount = 300;
  while (randomCount--) {
    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
    data.push({
      geometry: {
        type: 'Point',
        coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
      },
      properties: {
        count: Math.random() * 100
      }
    });
  }

  // 2. 创建MapVGL图层管理器
  var view = new mapvgl.View({
    map: bmapgl
  });

  // // 3. 创建可视化图层，并添加到图层管理器中
  // var layer = new mapvgl.PointLayer({
  //   color: 'rgba(50, 50, 200, 1)',
  //   blend: 'lighter',
  //   size: 2
  // });
  var pointLayer = new mapvgl.PointLayer({
    blend: 'lighter',
    size: 15,
    color: 'rgba(50, 50, 200, 1)'
  });
  view.addLayer(pointLayer);

  // 4. 准备好规范化坐标数据
  // var data = [{
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [116.403748, 39.915055]
  //   }
  // }];
  pointLayer.setData(data);
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>