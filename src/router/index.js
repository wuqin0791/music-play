
/*
 * @Description: This is a router file
 * @Author: JeanneWu
 * @Date: 2020-05-22 23:46:18
 */
// js文件头部注释之后的内容

import Vue from 'vue'
import Router from 'vue-router'
import Search from 'components/search/search'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import singerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    }
  ]
})
