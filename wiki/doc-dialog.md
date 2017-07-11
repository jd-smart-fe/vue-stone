# Modal

## Usage

```html
<v-dialog ref="dialog" v-model="shown" title="Title" desc="desc"></v-dialog>
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

## Events
事件名称   |    说明    |  参数
----    | ----       | ----    |
maskclick | 点击蒙版出发事件  | 无
buttonfirst |  点击第一个按钮发出事件 | 无
buttonsecond |  点击第二个按钮发出事件 | 无
buttonthird |  点击第三个按钮发出事件 | 无
buttonfourth |  点击第四个按钮发出事件 | 无
buttonfifth |  点击第五个按钮发出事件 | 无


## Methods
事件名称   |    说明    |  参数
----    | ----       | ----    |
show |  显示弹窗  | 无
hide |  隐藏弹窗 | 无
