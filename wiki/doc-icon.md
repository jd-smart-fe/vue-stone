# Icon

Icon 包含了常用的 Icon；

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
| 方法名称 | 说明 | 参数 | 返回值 |
| ----   | ---- | ---- | ---- |
| show(options) | 显示弹窗 |  参考Options  |  promies 对象，点击确定时状态改变为 Resolved，点击取消时状态改变为 Rejected。|
|hide() | 关闭弹窗 | 无 | 无 |

**备注：**
show 方法：

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


## Options

属性名   |    类型    |    默认值    |   说明
----    | ----    | ----    | ----    |
v-model | Boolean | false | 控制组件显隐
title |  String  |  '提示' |  设置弹窗标题
desc | String | 无 | 设置弹窗内容
tcolor | String | '#333' | 设置标题颜色
dcolor | String | '#999' | 设置内容颜色
buttons | Array | [{ text: '确定' }] | 设置按钮文字及颜色
preventClose | Boolean | false | 值为true时，点击按钮后不会自动关闭弹窗

**备注：**
buttons 属性：

```js
// 数组每一项对应一个按钮，最多可配置五个按钮
buttons: [{
    text: '确定',      // 按钮文本
    color: '#666',    // 按钮颜色 默认 '#59B8FC'
  },{
    text: '取消',      // 按钮文本
    color: 'red',     // 按钮颜色 默认 '#59B8FC'
}]
```

title 属性：

设置 title 属性为空字符串，`title=""`，组件将不会渲染 title 区域。

## Events

事件名称   |    说明    |    参数    |
----      | ----      | ----      |
show | 弹窗显示时触发此事件 | 无
hide | 弹窗隐藏时触发此事件 | 无

**备注：**
```js
this.$confirm.$on('hide', () => {
  console.log('confirm close');
});
```
