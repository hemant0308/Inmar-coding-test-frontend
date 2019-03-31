import Vue from 'vue';
import VueRouter from 'vue-router';

import mappings from './mappings';

import Main from './components/Main';
import LoginForm from './components/LoginForm'

Vue.use(VueRouter);

const routes = new VueRouter({
  mode: 'history',
  routes: [{
    path: mappings.ROOT_URL,
    component: Main
  }, {
    path: mappings.LOGIN_URL,
    component: LoginForm
  }]
});
export default routes;
