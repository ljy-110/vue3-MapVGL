const mainRoute = [
  {
    path: 'basics',
    component: () => import('../views/mvg/basics.vue'),
    meta: { title: '基础' }
  },
  {
    path: 'PointLayer',
    component: () => import('../views/mvg/PointLayer.vue'),
    meta: { title: '基础点图' }
  },
  {
    path: 'IconLayer',
    component: () => import('../views/mvg/IconLayer.vue'),
    meta: { title: 'icon图标图层' }
  },
  {
    path: 'mvg3DThree',
    component: () => import('../views/mvg/mvg3DThree.vue'),
    meta: { title: '3d+three' }
  },
  {
    path: 'PointTripLayer',
    component: () => import('../views/mvg/PointTripLayer.vue'),
    meta: { title: '点轨迹图' }
  },
  {
    path: 'HeatPointLayer',
    component: () => import('../views/mvg/HeatPointLayer.vue'),
    meta: { title: '热力点图' }
  },
  {
    path: 'HeatmapLayer',
    component: () => import('../views/mvg/HeatmapLayer.vue'),
    meta: { title: '热力图' }
  }
  // {
  //   path: 'jiangsuPatrolRectification',
  //   component: () => import('../views/check/projectCheck.vue'),
  //   meta: { title: '项目检查' }
  // }
];

export default mainRoute;