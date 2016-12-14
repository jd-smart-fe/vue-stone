import './components/_style';

import Range from './components/range';
import Switch from './components/switch';
import Power from './components/power';
import Panel from './components/panel';
// import Grid from './components/grid';
import Modal from './components/modal';
import Button from './components/button';
import Counter from './components/counter';
import ButtonGroup from './components/button-group';
import Modes from './components/modes';

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }
  Vue.component(Range.name, Range);
  Vue.component(Switch.name, Switch);
  Vue.component(Power.name, Power);
  Vue.component(Panel.name, Panel);
  // Vue.component(Grid.name, Grid);
  Vue.component(Modal.name, Modal);

  Vue.component(Button.name, Button);
  Vue.component(Counter.name, Counter);
  Vue.component(ButtonGroup.name, ButtonGroup);
  Vue.component(Modes.name, Modes);

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
