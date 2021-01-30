import Vue from 'vue'
import App from './App.vue'
import router from './router'

export const bus = new Vue();

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
})