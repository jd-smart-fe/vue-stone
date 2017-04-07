import './units/default';
import './components/_style';
import './components/_style_transition';
import list from '../libs/comlist';

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

    const component = require(`./components/${val}.vue`); // eslint-disable-line global-require
    Vue.component(component.name, component);
  });

  install.installed = true;
};
install.installed = false;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const Store = {
  install,
};
export default Store;
