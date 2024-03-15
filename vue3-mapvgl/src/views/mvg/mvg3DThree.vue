<template>
  <div>
    <div id="map_container" class="map-box" />
  </div>
</template>

<script setup>
// computed,onUnmounted,watch
import { ref, onMounted } from 'vue';
import cityGeo from '@/assets/js/city.json';
import mapStyleJson from '@/assets/js/mapStyleJson.json';
// import * as mapvgl from 'mapvgl';
import * as THREE from 'three';
import * as d3geo from 'd3-geo';

var mapGL = null;

const centerPosition = [115.276803, 25.802235];
function mapThreeInit() {
  calcSide(cityGeo); // 坐标转化
  var map = new BMapGL.Map('map_container'); // 实例化地图
  mapGL = map;
  let point = new BMapGL.Point(115.276803, 25.802235); // 中心点经纬度
  map.centerAndZoom(point, 9); // 设置地图中心点及缩放级别
  map.setTilt(35); // 倾斜角
  map.enableScrollWheelZoom(true); // 允许滚动缩放
  map.disableDoubleClickZoom(); // 禁止双击放大
  map.setMapStyleV2({ styleJson: mapStyleJson }); // 修改地图样式
  // map.setMinZoom(10); // 设置地图缩放最小级别
  // 实例化-地理可视化容器
  let view = new mapvgl.View({
    map: map,
    container: 'map_container'
  });
  // 获取three模型
  const { meshArray, line } = drawMap(cityGeo);
  var threeLayer = new mapvgl.ThreeLayer();
  view.addLayer(threeLayer);

  // 各区描边定位
  let cityGeos = [
    { name: '章贡区', geo: [115.276803, 25.802235], point: [114.88872, 25.851367] },
    { name: '南康区', geo: [115.276803, 25.802235], point: [114.656815, 25.688153] },
    { name: '赣县区', geo: [115.276803, 25.802235], point: [115.045016, 26.05739] },
    { name: '瑞金市', geo: [115.276803, 25.802235], point: [116.004854, 25.875278] },
    { name: '龙南市', geo: [115.276803, 25.802235], point: [114.792657, 24.90476] },
    { name: '信丰县', geo: [115.276803, 25.802235], point: [114.930893, 25.38023] },
    { name: '大余县', geo: [115.276803, 25.802235], point: [114.362243, 25.485937] },
    { name: '上犹县', geo: [115.276803, 25.802235], point: [114.410537, 25.894284] },
    { name: '崇义县', geo: [115.276803, 25.802235], point: [114.107348, 25.687911] },
    { name: '安远县', geo: [115.276803, 25.802235], point: [115.342328, 25.134591] },
    { name: '定南县', geo: [115.276803, 25.802235], point: [115.03267, 24.874277] },
    { name: '全南县', geo: [115.276803, 25.802235], point: [114.421589, 24.742651] },
    { name: '宁都县', geo: [115.276803, 25.802235], point: [116.018782, 26.472054] },
    { name: '于都县', geo: [115.276803, 25.802235], point: [115.411198, 25.955033] },
    { name: '兴国县', geo: [115.276803, 25.802235], point: [115.351896, 26.330489] },
    { name: '会昌县', geo: [115.276803, 25.802235], point: [115.791158, 25.429125] },
    { name: '寻乌县', geo: [115.276803, 25.802235], point: [115.651399, 24.954136] },
    { name: '石城县', geo: [115.276803, 25.802235], point: [116.342249, 26.426582] }
  ];
  // 添加区域label
  cityGeos.forEach(item => {
    let labelName = new BMapGL.Label(item.name, { position: new BMapGL.Point(item.point[0], item.point[1]), offset: new BMapGL.Size(0, 0) }
    );
    labelName.setStyle({
      color: '#def',
      background: 'none',
      border: 'none',
      fontSize: 16,
      fontWeight: 'bold'
    });
    map.addOverlay(labelName);
  });
  let projection = mapvgl.MercatorProjection;
    
  cityGeos.map((item, i) => {
    // 创建一个THREE.Vector3对象来保存墨卡托投影坐标
    var point = projection.convertLL2MC(new BMapGL.Point(item.geo[0], item.geo[1]));
    meshArray[i].position.x = point.lng;
    meshArray[i].position.y = point.lat;
    meshArray[i].position.z = 5000;

    line[i].position.x = point.lng;
    line[i].position.y = point.lat;
    line[i].position.z = 5000;

    threeLayer.add(meshArray[i]);
    threeLayer.add(line[i]);

  });

  // this.mapvglinit(map);

  map.addEventListener('zoomend', function(e) {
    map.getZoom();
  });
}
const centerPos = ref({});
var merTrans = null;
const mapSideInfo = ref({
  minlon: Infinity,
  maxlon: -Infinity,
  minlat: Infinity,
  maxlat: -Infinity
});
// 将three.js的经纬度转为百度地图的经纬度
function calcSide(geoJson) {
  const { features } = geoJson;

  features.forEach(feature => {
    dealWithCoord(feature.geometry, lonlatArr => {
      lonlatArr.forEach(([lon, lat]) => {
        if (lon > mapSideInfo.value.maxlon) mapSideInfo.value.maxlon = lon;
        if (lon < mapSideInfo.value.minlon) mapSideInfo.value.minlon = lon;
        if (lat > mapSideInfo.value.maxlat) mapSideInfo.value.maxlat = lat;
        if (lat < mapSideInfo.value.minlat) mapSideInfo.value.minlat = lat;
      });
    });
  });

  centerPos.value = {
    x: (mapSideInfo.value.maxlon + mapSideInfo.value.minlon) / 2,
    y: (mapSideInfo.value.maxlat + mapSideInfo.value.minlat) / 2
  };
  merTrans = d3geo.geoMercator().center([centerPos.value.x, centerPos.value.y]).translate([0, 0]);
}
// const merTrans = () => {
//   d3geo.geoMercator().center([centerPos.value.x, centerPos.value.y]).translate([0, 0]);
// };
// function merTrans() {
//   return d3geo.geoMercator().center([centerPos.value.x, centerPos.value.y]).translate([0, 0]);
// }
function drawMap(geometry) {
  const meshArray = [];
  const line = [];
  geometry.features.forEach(feature => {
    dealWithCoord(feature.geometry, lonlatArr => {
      const { shap, linePoints } = drawMapPlan(lonlatArr);
      // 几何体
      const geo = new THREE.ExtrudeGeometry(shap, {
        depth: 5000, // 设置厚度
        bevelEnabled: true
      });
      geo.rotateX(Math.PI);
      // 材质
      const material = new THREE.MeshBasicMaterial({
        // color: this.randomColor(),
        color: '#1d61c4',
        transparent: true,
        opacity: 0.65,
        size: THREE.DoubleSide
        // wireframe: true
      });
      // 物体
      const mesh = new THREE.Mesh(geo, material);
      // 线条
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xd7eefd
      });
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
      let l = new THREE.Line(lineGeometry, lineMaterial);
      l.rotateX(Math.PI);

      line.push(l);
      meshArray.push(mesh);
    });
  });
  return { meshArray, line };
}

function dealWithCoord(geometry, callback) {
  const { type, coordinates } = geometry;

  // 多面处理
  if (type === 'MultiPolygon') {
    coordinates.forEach(polyArray => {
      polyArray.forEach(lonlatArr => {
        callback(lonlatArr);
      });
    });
  } else
    coordinates.forEach(lonlatArr => {
      callback(lonlatArr);
    });
}
// 绘制three地图轮廓
function drawMapPlan(lonlatArr) {
  // 可以理解为canvas的绘制形状，moveTo、lineTo
  const shap = new THREE.Shape();
  const linePoints = [];

  // 修改 amplify 值 改变three模块的大小
  let amplify = 4.13 * 10000; // 放大倍数：按地图实际比例调整 three模块的大小
  lonlatArr.forEach((lonlat, index) => {
    // const [x, y] = lonlat;
    const [x, y] = merTrans(lonlat);
    if (!index) {
      shap.moveTo(x * amplify, y * amplify);

      linePoints.push(new THREE.Vector3(x * amplify, y * amplify, -0.001));
    } else {
      shap.lineTo(x * amplify, y * amplify);
      linePoints.push(new THREE.Vector3(x * amplify, y * amplify, -0.001));
    }
  });
  return {
    shap,
    linePoints
  };
}
onMounted(() => {
  mapThreeInit();
});
</script>
<style scoped lang='scss'>

</style>