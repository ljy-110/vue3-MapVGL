const mainRoute = [
  {
    path: 'basics',
    component: () => import('../views/mvg/basics.vue'),
    meta: { title: '基础' }
  }
  // {
  //   path: 'todoList',
  //   component: () => import('../views/todoList/todoList.vue'),
  //   meta: { title: '待办事项' }
  // },
  // {
  //   path: 'announcement',
  //   component: () => import('../views/announcement/announcement.vue'),
  //   meta: { title: '消息通知' }
  // },
  // {
  //   path: 'jiangsuPatrolRectification',
  //   component: () => import('../views/check/projectCheck.vue'),
  //   meta: { title: '项目检查' }
  // }
];

export default mainRoute;