import VueLogger from '../libs/vue-logger';
import Initializer from '../libs/initializer';
import dependencies from '../libs/dependencies';
import './utils/common';

// 引入全局样式
import './components/_style';

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }

  const components = dependencies(options.components ? options.components : Initializer.components);
  const singletonComponents = [];

  /* eslint-disable global-require */
  components.every(val => {

    // _style 开头的样式组件，只需引入不需要注册为组件
    // if (val.indexOf('_style') !== -1) {
    //   require(`./components/${val}.vue`);
    //   return true;
    // }

    const Component = Vue.extend(require(`./components/${val}.vue`));
    if (Component.options.type === 'singleton') {
      singletonComponents.push(Component);
    }
    Vue.component(Component.options.name, Component);
    return true;
  });

  singletonComponents.forEach((Component) => {
    const instance = new Component({
      el: document.createElement(Component.options.tag || 'div'),
    });
    Vue.prototype[`$${Component.options.name.replace('v-', '')}`] = instance;
  });

  VueLogger.install(Vue, {
    /* eslint-disable func-names  */
    format(...str) {
      str.unshift(`[Vue Component ${this.$options.name}]: `);
      return str;
    },
  });

  install.installed = true;
};
install.installed = false;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Stone = {
  install,
};

export default Stone;
