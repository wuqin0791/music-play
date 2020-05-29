/*
 * @Description: 一个jsonP的promise封装
 * @Author: JeanneWu
 * @Date: 2020-05-22 22:53:26
 */
// js文件头部注释之后的内容
import initJSONP from 'jsonp'

export default function jsonp(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    initJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 用来拼接data到url上面
function param(data) {
  let url = ''
  for (let i in data) {
    let v = i !== undefined ? data[i] : '' // 去掉undefined的情况
    if (Object.prototype.toString.call(v).slice(8, -1) === 'Object') {
      v = JSON.stringify(v)
    }
    url += '&' + `${i}=${encodeURIComponent(v)}`
  }
  return url.substring(1)
}
