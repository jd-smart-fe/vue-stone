import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import Store from './store';

import './pages/_example_style';
import _tmpl_back from './pages/_tmpl_back';

import Timer from './pages/timer';
import NotFind from './pages/404';
import Button from './pages/button';
import Range from './pages/range';
import Panel from './pages/panel';
import Icons from './pages/icons';
import DaysPicker from './pages/days-picker';
import Modes from './pages/modes';
import Slider from './pages/slider';
import ActionSheet from './pages/action-sheet';
import Dialog from './pages/dialog';
import Form from './pages/form';
import Counter from './pages/counter';
import Picker from './pages/picker';
import Switch from './pages/switch';
import Transition from './pages/transition';


Vue.use(VueRouter);
Store.install(Vue);

Vue.component('tmpl-back', _tmpl_back);

const routes = [
  { path: '/', component: App },
  { path: '/timer', component: Timer },
  { path: '/404', component: NotFind },
  { path: '/button', component: Button },
  { path: '/range', component: Range },
  { path: '/panel', component: Panel },
  { path: '/icons', component: Icons },
  { path: '/days-picker', component: DaysPicker },
  { path: '/modes', component: Modes },
  { path: '/timer', component: Timer },
  { path: '/slider', component: Slider },
  { path: '/action-sheet', component: ActionSheet },
  { path: '/dialog', component: Dialog },
  { path: '/form', component: Form },
  { path: '/counter', component: Counter },
  { path: '/picker', component: Picker },
  { path: '/switch', component: Switch },
  { path: '/transition', component: Transition },
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
