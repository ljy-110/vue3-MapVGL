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
function init() {
  var bmapgl = new BMapGL.Map('map_container');
  var point = new BMapGL.Point(113.331104, 23.112136);
  bmapgl.centerAndZoom(point, 8);
  bmapgl.setTilt(35); // 倾斜角
  bmapgl.enableScrollWheelZoom(true);
  bmapgl.disableDoubleClickZoom();
  bmapgl.setMapStyleV2({ styleJson: mapStyleJson });

  // 2. 创建MapVGL图层管理器
  var view = new mapvgl.View({
    map: bmapgl
  });
}

onMounted(() => {
  init();
});
</script>
<style scoped lang='scss'>

</style>