
/*
 * @Description: This is a singer api file
 * @Author: JeanneWu
 * @Date: 2020-05-27 09:10:03
 */
// js文件头部注释之后的内容
import jsonP from 'common/js/jsonp'
// import axios from 'axios'
import {
  commonPara,
  options
} from 'api/config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonPara, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonP(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonPara, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 180,
    songstatus: 1,
    singermid: singerId
  })

  return jsonP(url, data, options)
}
