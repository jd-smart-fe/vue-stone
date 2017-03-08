const L = require('../config/list.json');

const initList = L.list;
const dependence = L.dependence;

const list = componentsList(dependence, initList);

function componentsList(depe_, list_) {
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
  return componentsList(depe_, _list);
}

module.exports = { list };
