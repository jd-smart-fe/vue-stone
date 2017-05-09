const CONFIG = require('../vue-stone.config.js');

if (process.env.NODE_ENV !== 'production') {
  CONFIG.components = [
    '_style_iconfonts',
    'dayspicker',
    'range',
    'switch',
    'power',
    'panel',
    'dialog',
    'alert',
    'button',
    'button-switch',
    'button-group',
    'counter',
    'modes',
    'mask',
    'picker',
    'checkboard',
    'action-sheet',
    'action-box',
    'input',
    'timer',
    'timer-task',
    'timepicker',
    'transition',
    'slide',
    'toast',
    'loading',
  ];
}

module.exports = {
  components: CONFIG.components,
};
