var list = require('../config/list.js');

if (process.env.NODE_ENV !== 'production') {
  // 开发时
  list = [
      "_style_iconfonts",
      "dayspicker",
      "range",
      "switch",
      "power",
      "panel",
      "dialog",
      "button",
      "button-switch",
      "button-group",
      "counter",
      "modes",
      "mask",
      "picker",
      "checkboard",
      "action-sheet",
      "action-box",
      "input",
      "timer",
      "timer-task",
      "timepicker",
      "transition",
      "slide",
      'toast',
  ];
}

module.exports = {
  list,
  dependence: {
    "dayspicker": ["button"],
    "dialog": ["mask"],
    "counter": ["button"],
    "button-group": ["button"],
    "button-switch": ["button"],
    "action-sheet": ["mask", "action-box"],
    "action-box": ["mask"],
    "timer": ["panel", "timepicker", "modes", "dialog",
      "switch", "dayspicker", "timer-task", "input", "checkboard"
    ],
    "timer-task": ["panel", "modes", "range", "counter"],
    "timepicker": ["picker"],
  }
}
