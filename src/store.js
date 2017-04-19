import './units/default';
import './components/_style';
import './components/_style_transition';
import list from '../libs/comlist';
import VueLogger from './libs/vue-logger';

const plugins = [];
plugins.push(VueLogger);

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }

  list.list.forEach(val => {
    // _style 开头的样式组件，只需引入不需要注册为组件
    if (val.indexOf('_style') !== -1) {
      require(`./components/${val}.vue`); // eslint-disable-line global-require
      return;
    }

    const Component = Vue.extend(require(`./components/${val}.vue`)); // eslint-disable-line global-require
    // Utils.logWrapper(Component);
    Vue.component(Component.options.name, Component);
  });

  install.installed = true;
};
install.installed = false;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  VueLogger.install(window.Vue, {
    /* eslint-disable func-names  */
    format(...str) {
      str.unshift(`[Vue Component ${this.$options.name}]: `);
      return str;
    },
  });
}

const Store = {
  install,
  plugins,
};
export default Store;
