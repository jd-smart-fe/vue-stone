# Toast

Toast 组件向 Vue 原型属性上添加了 `$confirm` 属性，通过调用当前 vue 实例 `$confirm` 属性的方法来使用 comfirm。

`this.$confirm.show(opt)` 方法接受一个参数来配置 toast，参数可以是一个字符串，或者是一个对象。

## 方法参数

```js
this.$confirm.show({
  title: 'confirm',  // 标题
  description: 'This is confirm content',  // 内容区 默认无
  callback: this.clickConfirm.bind(this)  // 该 callback 会在点确定按钮时执行。默认状态下 callback 中的  this 会指向 confirm 组件的上下文，所以用 bind(this) 来绑定上下文环境到当前 vue 实例
})
```

或者直接传入字符串
```js
this.$confirm.show('Hello world');
```
直接传入字符串后，点击取消或确定按钮都会关闭弹窗。

## Methods

调用 `this.$confirm.hide()` 来关闭弹窗

## Events

监听 `close` 事件来订阅 alert 弹窗的关闭时机。

```js
this.$confirm.$on('close', () => {
  console.log('confirm close');
});
```
