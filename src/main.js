import Vue from 'vue';
import App from './App';
import Time from './Time';
import Store from './store';

Store.install(Vue);

const routes = {
  '/': App,
  '/time': Time,
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute];
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
