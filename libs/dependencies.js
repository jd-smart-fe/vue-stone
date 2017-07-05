const intactify = require('./intactify').default;

/* eslint-disable no-var */
var dependencies = {
  alert: ['dialog'],
  confirm: ['dialog'],
  loading: ['toast'],
  dayspicker: ['button'],
  dialog: ['mask'],
  counter: ['button'],
  'button-group': ['button'],
  'button-switch': ['button'],
  'action-sheet': ['mask', 'action-box'],
  'action-box': ['mask'],
  timer: ['panel', 'timepicker', 'modes', 'dialog',
    'switch', 'dayspicker', 'timer-task', 'input', 'checkboard',
  ],
  'timer-task': ['panel', 'modes', 'range', 'counter'],
  timepicker: ['picker'],
};

module.exports = function dep(list) {
  return intactify(dependencies, list);
};
