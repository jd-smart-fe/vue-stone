import Vue from 'vue';
import App from './App';

import Switch from './components/switch';
import Power from './components/power';
import Panel from './components/panel';

Vue.component(Switch.name, Switch);
Vue.component(Power.name, Power);
Vue.component(Panel.name, Panel);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
