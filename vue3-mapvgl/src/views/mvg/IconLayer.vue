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
import marker from '@/assets/images/marker.png';
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(103.46752, 37.289917);
  bmapgl.centerAndZoom(point, 6);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });
  // bmapgl.setMinZoom(10) //缩放限制
  var pt = new BMapGL.Point(109.792816, 27.702774);
  var mk = new BMapGL.Marker(pt);
  bmapgl.addOverlay(mk);
  var data = [];
  var citys = [
    '北京', '天津', '上海', '重庆', '石家庄', '太原', '呼和浩特', '哈尔滨',
    '长春', '沈阳', '济南', '南京', '合肥', '杭州', '南昌', '福州', '郑州',
    '武汉', '长沙', '广州', '南宁', '西安', '银川', '兰州', '西宁', '乌鲁木齐',
    '成都', '贵阳', '昆明', '拉萨', '海口'
  ];
  var randomCount = 100;
  while (randomCount--) {
    var cityCenter = mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length, 10)]);
    data.push({
      geometry: {
        type: 'Point',
        coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
      }
      // properties: {
      //     icon: markers[Math.floor(Math.random() * markers.length)]
      // }
    });
  }

  // 2. 创建MapVGL图层管理器
  var view = new mapvgl.View({
    map: bmapgl
  });
  var pointLayer = new mapvgl.IconLayer({
    width: 100 / 6,
    height: 153 / 6,
    offset: [0, -153 / 12],
    opacity: 0.8,
    icon: marker,
    enablePicked: true, // 是否可以拾取
    selectedIndex: -1, // 选中项
    selectedColor: '#ff0000', // 选中项颜色
    autoSelect: true, // 根据鼠标位置来自动设置选中项
    onClick: e => { // 点击事件
      console.log('click', e);
      alert('点击click：' + e.dataItem.geometry.coordinates[0] + ',' + e.dataItem.geometry.coordinates[1]);
    },
    onDblClick: e => {
      console.log('double click', e);
    },
    onRightClick: e => {
      console.log('right click', e);
    }
  });
  view.addLayer(pointLayer);
  pointLayer.setData(data);
  bmapgl.setDefaultCursor('default');
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>