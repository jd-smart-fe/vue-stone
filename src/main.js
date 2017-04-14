import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import Store from './store';

import './pages/_example_style';
import TmplBack from './pages/_tmpl_back';

const list = [{
  name: 'timer',
}, {
  name: '404',
}, {
  name: 'button',
}, {
  name: 'range',
}, {
  name: 'panel',
}, {
  name: 'icons',
}, {
  name: 'days-picker',
}, {
  name: 'modes',
}, {
  name: 'slider',
}, {
  name: 'action-sheet',
}, {
  name: 'dialog',
}, {
  name: 'form',
}, {
  name: 'counter',
}, {
  name: 'picker',
}, {
  name: 'switch',
}, {
  name: 'transition',
}];

Vue.use(VueRouter);
Store.install(Vue);

Vue.component('tmpl-back', TmplBack);

const routes = [{ path: '/', component: App },
  /* eslint-disable global-require */
  ...list.map((item) => {
    const route = {
      path: `/${item.name}`,
      component: require(`./pages/${item.name}`),
    };
    return route;
  }),
];

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
const app = new Vue({
  router,
  template: `
    <div id="app">
      <transition name="">
        <router-view></router-view>
      </transition>
    </div>
  `,
}).$mount('#app');
