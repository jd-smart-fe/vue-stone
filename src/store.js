import Range from './components/range';
import Switch from './components/switch';
import Power from './components/power';
import Panel from './components/panel';
import ButtonIncDec from './components/buttonIncDec';
import Grid from './components/grid';
import Button from './components/button';
import ButtonGroup from './components/buttonGroup';

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }
  Vue.component(Range.name, Range);
  Vue.component(Switch.name, Switch);
  Vue.component(Power.name, Power);
  Vue.component(Panel.name, Panel);
  Vue.component(ButtonIncDec.name, ButtonIncDec);
  Vue.component(Button.name, Button);
  Vue.component(ButtonGroup.name, ButtonGroup);
  Vue.component(Grid.name, Grid);
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
