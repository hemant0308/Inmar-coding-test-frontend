import Vue from 'vue';
import App from './App.vue';
import _ from 'lodash';
import $ from 'jquery';

import './plugins';

import routes from './routes';

window.$ = $;

require('./assets/css/main.css');
require('./assets/css/helpers.css');



Vue.config.productionTip = false;

export default new Vue({
  router: routes,
  render: h => h(App),
}).$mount('#app');
