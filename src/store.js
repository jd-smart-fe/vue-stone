import './units/default';
import './components/_style';
import './components/_style_transition';
import { list } from './list.json';


const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }

  list.forEach(val => {

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
