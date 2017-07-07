# Alert

Alert 组件向 Vue 原型属性上添加了 `$alert` 属性，通过调用当前 vue 实例 `$alert` 属性的方法来使用 alert。

`this.$alert.show(opt)` 方法接受一个参数来配置 alert，参数可以是一个字符串，或者是一个对象。


## Usage

调用 show(options) 传入对象参数
```js
this.$alert.show({
  title: 'alert',  // 标题
  desc: 'This is alert content',  // 内容区 默认无
})
```

或者直接传入字符串
```js
this.$alert.show('Hello world');
```



## Methods
方法名称   |    说明    |    参数    |   返回值
----      | ----      | ----      |
show(options) | 显示弹窗 |  参见备注  |   promies 对象，会在弹窗关闭时状态改变为 Resolved
hide() | 关闭弹窗 | 无 | 无

**备注：**
```js
this.$alert.show({
  title: 'Title',    // Alter 的 标题
  desc: 'This is alert content',  // Alert 的内容，默认 无
  buttonText: '确定',    // 按钮的文案，默认 “确定”
  buttonColor: 'red'    // 按钮颜色，默认 '#666'
}).then(() => {
  console.log('弹窗关闭啦');
});
```

## Events

事件名称   |    说明    |    参数    |
----      | ----      | ----      |
show | 弹窗显示时触发此事件 | 无
hide | 弹窗隐藏时触发此事件 | 无

```js
this.$alert.$on('hide', () => {
  console.log('confirm close');
});
```
