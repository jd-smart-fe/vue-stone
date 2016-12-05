
const helper = {};

helper.convertNodelist = (nodeList) => Array.prototype.slice.call(nodeList, 0);

helper.createVuefactory = (Klass, Component) => (config = {}, createElementOption) => {
  config.el = document.createElement('div');
  if (!createElementOption) {
    config.render = (createElement) => createElement(Component);
  } else {
    config.render = (createElement) => createElement(Component, createElementOption);
  }

  return new Klass(config);
};

export default helper;

