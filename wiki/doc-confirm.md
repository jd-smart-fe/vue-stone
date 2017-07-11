# Comfirm

Toast 组件向 Vue 原型属性上添加了 `$confirm` 属性，通过调用当前 vue 实例 `$confirm` 属性的方法来使用 comfirm。

`this.$confirm.show(opt)` 方法接受一个参数来配置 toast，参数可以是一个字符串，或者是一个对象。

## Usage

调用 show(options) 传入对象参数
```js
this.$confirm.show({
  title: 'confirm',  // 标题
  desc: 'This is confirm content',  // 内容区 默认无
})
```

或者直接传入字符串
```js
this.$confirm.show('Hello world');
```


## Methods
方法名称   |    说明    |    参数    |   返回值
----      | ----      | ----      |
show(options) | 显示弹窗 |  参见备注  |   promies 对象，点击确定时状态改变为 Resolved，点击取消时状态改变为 Rejected。
hide() | 关闭弹窗 | 无 | 无

**备注：**
```js
this.$confirm.show({
  title: 'Title',    // Alter 的 标题
  desc: 'This is confirm content',  // confirm 的内容，默认 无
  leftColor: 'blue',    // 按钮的文案，默认 #59B8FC
  rightColor: 'red'    // 按钮颜色，默认 '#666'
}).then(() => {
  console.log('点击确定');
}, () => {
  consle.log('点击取消');
});
```

## Events

事件名称   |    说明    |    参数    |
----      | ----      | ----      |
show | 弹窗显示时触发此事件 | 无
hide | 弹窗隐藏时触发此事件 | 无

```js
this.$confirm.$on('hide', () => {
  console.log('confirm close');
});
```
