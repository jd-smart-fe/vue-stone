# Alert

Alert 组件向 Vue 原型属性上添加了 `$alert` 属性，通过调用当前 vue 实例 `$alert` 属性的方法来使用 alert。

`this.$alert.show(opt)` 方法接受一个参数来配置 alert，参数可以是一个字符串，或者是一个对象。

## 方法参数

```js
this.$alert.show({
  title: 'Title',    // Alter 的 标题
  description: 'This is alert content',  // Alert 的内容，默认 “”
  // buttonText: '确定',    // 按钮的文案，默认 “确定”
})
```

或者直接传入字符串
```js
this.$alert.show('Hello world');
```

## Methods

调用 `this.$alert.hide()` 来强制关闭弹窗

## Events

监听 `close` 事件来订阅 alert 弹窗的关闭时机。

```js
this.$alert.$on('close', () => {
  console.log('confirm close');
});
```
