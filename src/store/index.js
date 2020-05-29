
/*
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-05-28 12:56:41
 */
// js文件头部注释之后的内容
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// 通过判断是否是生产环境来开启debug
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
