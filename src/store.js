import './components/_style';

import Dayspicker from './components/dayspicker';
import Range from './components/range';
import Switch from './components/switch';
import Power from './components/power';
import Panel from './components/panel';
import Dialog from './components/dialog';
import Button from './components/button';
import Counter from './components/counter';
import ButtonGroup from './components/button-group';
import Modes from './components/modes';
import Mask from './components/mask';
import Picker from './components/picker';
import Checkboard from './components/checkboard';
import Actions from './components/actions';
import Input from './components/input';
import Timer from './components/timer';
import TimerTask from './components/timer-task';
import Timepicker from './components/timepicker';
import Transition from './components/transition';

const install = (Vue, options = {}) => {
  if (install.installed) {
    return;
  }
  Vue.component(Dayspicker.name, Dayspicker);
  Vue.component(Range.name, Range);
  Vue.component(Switch.name, Switch);
  Vue.component(Power.name, Power);
  Vue.component(Panel.name, Panel);
  Vue.component(Dialog.name, Dialog);
  Vue.component(Mask.name, Mask);
  Vue.component(Button.name, Button);
  Vue.component(Counter.name, Counter);
  Vue.component(ButtonGroup.name, ButtonGroup);
  Vue.component(Modes.name, Modes);
  Vue.component(Picker.name, Picker);
  Vue.component(Checkboard.name, Checkboard);
  Vue.component(Actions.name, Actions);
  Vue.component(Input.name, Input);
  Vue.component(Timer.name, Timer);
  Vue.component(TimerTask.name, TimerTask);
  Vue.component(Timepicker.name, Timepicker);
  Vue.component(Transition.name, Transition);

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
