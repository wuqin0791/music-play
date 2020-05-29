/*
 * @Description: 推荐相关API
 * @Author: JeanneWu
 * @Date: 2020-05-24 09:53:26
 */
// js文件头部注释之后的内容

import jsonP from 'common/js/jsonp'
import axios from 'axios'
import {
  commonPara
} from 'api/config'

export function getRecommend() {
  // const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
  const data = Object.assign({}, commonPara, {
    sign: 'zzaokqat38cn6gheff15c4441255ee9ef959d8dacccc3f88',
    platform: 'yqq.json',
    loginUin: 0,
    hostUin: 0,
    data: {
      'comm': {
        'ct': 24
      },
      'category': {
        'method': 'get_hot_category',
        'param': {
          'qq': ''
        },
        'module': 'music.web_category_svr'
      },
      'recomPlaylist': {
        'method': 'get_hot_recommend',
        'param': {
          'async': 1,
          'cmd': 2
        },
        'module': 'playlist.HotRecommendServer'
      },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': {
          'id': 8,
          'curPage': 1,
          'size': 40,
          'order': 5,
          'titleid': 8
        },
        'module': 'playlist.PlayListPlazaServer'
      },
      'new_song': {
        'module': 'newsong.NewSongServer',
        'method': 'get_new_song_info',
        'param': {
          'type': 5
        }
      },
      'new_album': {
        'module': 'newalbum.NewAlbumServer',
        'method': 'get_new_album_info',
        'param': {
          'area': 1,
          'sin': 0,
          'num': 20
        }
      },
      'new_album_tag': {
        'module': 'newalbum.NewAlbumServer',
        'method': 'get_new_album_area',
        'param': {}
      },
      'toplist': {
        'module': 'musicToplist.ToplistInfoServer',
        'method': 'GetAll',
        'param': {}
      },
      'focus': {
        'module': 'music.musicHall.MusicHallPlatform',
        'method': 'GetFocus',
        'param': {}
      }
    }
  })
  return jsonP(url, data)
}
export function getDescList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonPara, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  console.log(data)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
