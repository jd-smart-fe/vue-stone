# Loading

Loading 组件向 Vue 原型上添加了 `$loading` 属性，通过调用当前 vue 实例 `$loading` 属性的方法来使用 loading。

## Usage

`$loading` 提供了两个方法 `$loading.show([option])` 和 `$loading.hide()`


example:
```js
this.$loading.show();

this.$loading.show({
 modal: true,
 text: '正在控制',
});;

setTimeout(() => {
  this.$loading.hide();
}, 3000);
```
