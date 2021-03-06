
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import '@/common/stylus/index.styl'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(lazyload, {
  loading: require('common/image/logo@2x.png')
})
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
