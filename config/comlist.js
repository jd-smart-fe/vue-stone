var initList = require('./list.json').list;
var dependence = require('./list.json').dependence;

var list = [];

componentsList(dependence, initList);

function componentsList(depe_, list_) {
  const length = list_.length;
  let _list = list_.concat();

  // 有相关依赖的组件
  const _l = list_.filter(val => Object.keys(depe_).includes(val));

  // 添加相关依赖
  _l.forEach(val => {
    // 依赖去重
    const needPush = depe_[val].filter(val => !_list.includes(val));
    // 将新依赖推入数组
    _list.push.apply(_list, needPush);
  });

  // 如果数组长度没有发生变化，说明没有新的相关依赖组件
  if (length === _list.length) {
    // 赋值
    list = _list;
    return;
  }

  // 递归调用
  componentsList(depe_, _list);
}

module.exports = { list };
