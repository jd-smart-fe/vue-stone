# Toast

Toast 组件向 Vue 原型上添加了 `$toast` 属性，通过调用当前 vue 实例 `$toast` 属性的方法来使用 toast。

例如
```js
// 普通只包含文本的 toast
this.$toast.show('布谷，布谷。');

// 包含icon 的 toast
this.$toast.show({
  icon: 'icon-home',
  text: '操作成功',
});
```


`this.$toast.show(opt)` 方法接受一个参数来配置 toast，参数可以是一个字符串，或者是一个对象。

## 参数为对象完整的配置

```js
this.$toast.show({
  icon: 'icon-home',   // toast 的 icon，默认无
  text: '操作成功',      // 提示的文字，默认无
  duration: 2000        // toast 持续的时间，默认 2000
  autohide: true,       // 是否自动隐藏，默认 true
})
```

或者直接传入字符串
```js
this.$toast.show('Hello world');
```

## 手动隐藏 toast

将 autohide 值为 false，取消 toast 的自动隐藏

```js
this.$toast.show({
  text: 'waiting',      // 提示的文字，默认无
  autohide: false,
})
```
然后手动调用 `$toast.hide()` 方法来隐藏 toast

```js
this.$toast.hide();
```
