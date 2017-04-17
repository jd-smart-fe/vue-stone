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

  /* eslint-disable func-names  */
  ['log', 'warn', 'error'].forEach((op) => {
    Vue.prototype[`$${op}`] = function (...str) {
      if (process.env.NODE_ENV === 'production') {
        return;
      }

      str.unshift(`[Vue Component ${this.$options.name}]: `);
      console[op](...str);
    };
  });
};

export default VueLogger;
