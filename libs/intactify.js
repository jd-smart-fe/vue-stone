/**
 * 这里用 export default 而不是 module.exports 是因为在 webpack2 下，
 * 会对 `module.exports intactify` 报错 `Cannot assign to read only property 'exports' of object '#<Object>' (mix require and export) `
 * 令人费解。
 *
 * https://github.com/webpack/webpack/issues/4039  这个 issue 指明了 混用 require 和 export 会产生报错，
 * 但是在这里并不存在 require 和 export 混用的情况。因此这个报错令人费解
 *
 * 2018-04-25
 * @pspgbhu
 * 发现如果在 intactify 函数中去掉一些高级语法就不会产生上述报错。
 */

/* eslint-disable */
module.exports = function intactify(depe_, list_) {
  var length = list_.length;
  var _list = list_.concat();

  // // 有相关依赖的组件
  var _l = list_.filter(val => {
    for (var key in depe_) {
      if (Object.prototype.hasOwnProperty.call(depe_, key)) {
        const value = depe_[key];
        if (value === val) {
          return true;
        }
      }
    }
    return false;
  });

  // // 添加相关依赖
  _l.forEach(val => {
    // 依赖去重
    const needPush = depe_[val].filter(item => _list.indexOf(item) === -1);
    // 将新依赖推入数组
    _list.push.apply(_list, needPush);
  });

  // // 如果数组长度没有发生变化，说明没有新的相关依赖组件
  if (length === _list.length) {
    // 赋值
    return _list;
  }

  // // 递归调用
  return intactify(depe_, _list);
}
