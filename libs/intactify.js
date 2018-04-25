function intactify(depe_, list_) {
  const length = list_.length;
  const _list = list_.concat();

  // 有相关依赖的组件
  const _l = list_.filter(val => Object.keys(depe_).indexOf(val) !== -1);

  // 添加相关依赖
  _l.forEach(val => {
    // 依赖去重
    const needPush = depe_[val].filter(item => _list.indexOf(item) === -1);
    // 将新依赖推入数组
    // _list.push.apply(_list, needPush);
    _list.push(...needPush);
  });

  // 如果数组长度没有发生变化，说明没有新的相关依赖组件
  if (length === _list.length) {
    // 赋值
    return _list;
  }

  // 递归调用
  return intactify(depe_, _list);
}

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
 * 又将 export default 改回了 module.exports，因为在 webpack 3 下不再出现这个问题了。
 */
module.exports = intactify;
