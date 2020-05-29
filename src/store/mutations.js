
/*
 * @Description: This is a vuex mutation file
 * @Author: JeanneWu
 * @Date: 2020-05-28 12:56:22
 */
// js文件头部注释之后的内容
import * as types from './mutation-types'

const mutations = {
  // type && payload
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  }
}

export default mutations
