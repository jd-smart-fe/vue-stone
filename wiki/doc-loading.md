# Loading

Loading 组件向 Vue 原型上添加了 `$loading` 属性，通过调用当前 vue 实例 `$loading` 属性的方法来使用 loading。

## Usage

`$loading` 提供了两个方法 `$loading.show()` 和 `$loading.hide()`

example:
```js
this.$loading.show();

setTimeout(() => {
  this.$loading.hide();
}, 3000);
```
