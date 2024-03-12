<template>
  <div>
    <div class="common-layout">
      <Menu class="menu-box" />
      <router-view class="bg-white" />
    </div>
  </div> 
</template>

<script setup>
// computed,onUnmounted,watch
import { ref, reactive, onMounted } from 'vue';
import Menu from '@/components/menu.vue';
onMounted(() => {});
</script>
<style scoped lang='scss'>
.common-layout{
  width: 100%;
  height: 100vh;
}
.menu-box{
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
}
</style>