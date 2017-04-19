const VueLogger = {};

VueLogger.install = (Vue, options) => {

  // let methods = {};

  // ['log', 'warn', 'error'].forEach((op) => {
  //   methods[`$${op}`] = (...str) => {
  //     if (process.env.NODE_ENV === 'production') {
  //       return;
  //     }
  //     str.unshift(`Component ${this.$options.name} `);
  //     console[op](...str);
  //   };
  // });

  // Vue.mixin({
  //   methods,
  // });

  const defaults = {
    silent: Vue.config.silent,
    format: (...str) => {
      str.unshift('[Vue Logger]: ');
      return str;
    },
  };

  options = Object.assign({}, defaults, options);


  /* eslint-disable func-names  */
  ['log', 'warn', 'error'].forEach((op) => {
    Vue.prototype[`$${op}`] = function (...str) {

      if (options.silent) {
        return;
      }

      str = options.format.apply(this, str);

      console[op](...str);
    };
  });
};

export default VueLogger;
