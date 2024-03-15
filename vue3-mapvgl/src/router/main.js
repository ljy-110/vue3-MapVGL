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
  }
  // {
  //   path: 'jiangsuPatrolRectification',
  //   component: () => import('../views/check/projectCheck.vue'),
  //   meta: { title: '项目检查' }
  // }
];

export default mainRoute;