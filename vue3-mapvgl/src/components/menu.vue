<template>
  <div>
    <div class="header" @click="menuShow = !menuShow">MvgVGL--{{ menuInfo.name }}</div>
    <transition name="el-zoom-in-top">
      <ul v-show="menuShow" class="ul-box">
        <li v-for="(item,index) in menuList" :key="index" :class="[item.id == menuInfo.id ?'active':'']" class="li-box" @click="toRoute(item)">
          {{ item.name }} - {{ item.router }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
// computed,onUnmounted,watch
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const menuShow = ref(true);
const menuList = [
  { name: '基础版本', id: '1', router: 'basics' },
  { name: 'three+3d', id: '122', router: 'mvg3DThree' },
  { name: '基础点图', router: 'PointLayer', id: 2 },
  { name: 'Icon图标图', router: 'IconLayer', id: 3 },
  { name: '点轨迹图', router: 'PointTripLayer', id: 4 },
  { name: '热力点图', router: 'HeatPointLayer', id: 5 },
  { name: '热力图图', router: 'HeatmapLayer', id: 6 },
  { name: '热力柱图', router: 'HeatGridLayer', id: 7 },
  { name: '烟花点图', router: 'SparkLayer', id: 8 },
  { name: '圆图', router: 'CircleLayer', id: 9 },
  { name: '波纹点图', router: 'RippleLayer', id: 10 },
  { name: '文字图', router: 'TextLayer', id: 11 },
  { name: '雷达图', router: 'FanLayer', id: 12 },
  { name: '基础线图', router: 'SimpleLineLayer', id: 13 },
  { name: '宽线图', router: 'LineLayer', id: 14 },
  { name: '立体墙图', router: 'WallLayer', id: 15 },
  { name: '热力线图', router: 'HeatLineLayer', id: 16 },
  { name: '渐变线图', router: 'LineRainbowLayer', id: 17 },
  { name: '蝌蚪线图', router: 'LineFlowLayer', id: 18 },
  { name: '线轨迹图', router: 'LineTripLayer', id: 19 },
  { name: '墙轨迹图', router: 'WallTripLayer', id: 20 },
  { name: '飞线图', router: 'FlyLineLayer', id: 21 },
  { name: '基础面图', router: 'ShapeLayer', id: 22 },
  { name: '线状面图', router: 'ShapeLineLayer', id: 23 },
  { name: '平面图', router: 'PolygonLayer', id: 24 },
  { name: '遮图', router: 'MaskLayer', id: 25 },
  { name: '点聚合图', router: 'ClusterLayer', id: 26 },
  { name: '图标聚合图层', router: 'IconClusterLayer', id: 27 },
  { name: '蜂窝图层', router: 'HoneycombLayer', id: 28 }
];
const menuInfo = ref({});
menuInfo.value = menuList[0];

function toRoute(item) {
  menuInfo.value = item;
  menuShow.value = false;
  router.push('/' + item.router);
}

onMounted(() => {});
</script>
<style scoped lang='scss'>
.header{
  // position: fixed;
  // top: 10px;
  // left: 10px;
  // z-index: 100;
  font-size: 30px;
  font-weight: bold;
  background-color: #def;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
}
.ul-box{
  margin-top: 15px;
  background-color: #def;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
}
.li-box{
  cursor: pointer;
  padding: 3px 0;
  box-sizing: border-box;
  border-radius: 5px;
}
.li-box:hover,.li-box.active{
  background-color:#B2DFEE;
}
</style>