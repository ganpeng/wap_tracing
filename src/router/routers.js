import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export const constantRouterMap = [
  // 移动端wap页面
  {
    path: '/wap/tracing/index',
    name: 'Tracing',
    component: () => import('@/views/wap/Tracing')
  },
  {
    path: '/wap/tracing/detail',
    name: 'TracingDetail',
    component: () => import('@/views/wap/TracingDetail')
  },
  // 移动端推广
  {
    path: '/wap/spread',
    name: 'WapSpread',
    component: () => import('@/views/wap/WapSpread')
  },
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
