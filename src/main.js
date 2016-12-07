import Vue from 'vue';
import App from './App';
import Store from './store';

Store.install(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
