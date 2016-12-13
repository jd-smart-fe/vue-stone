import Switch from './components/switch';
import Power from './components/power';
import Panel from './components/panel';
import IncDec from './components/incDec';
import Grid from './components/grid';
import Modal from './components/modal';

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }
  Vue.component(Switch.name, Switch);
  Vue.component(Power.name, Power);
  Vue.component(Panel.name, Panel);
  Vue.component(IncDec.name, IncDec);
  Vue.component(Grid.name, Grid);
  Vue.component(Modal.name, Modal);
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
