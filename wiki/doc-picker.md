# Picker

## Tag Name

`v-picker`

## Options

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
items | Array | [] | 配置 picker 组件中的选项，备注中会详细说明。
shown | Boolean | false | 控制 picker 组件显隐
mode | String | 'inline' | 两种显示模式, 支持 inline 模式 及 modal 模式
buttonColor | String | '#59B8FC' | modal 模式下按钮的颜色
title | String | '' | modal 模式下标题栏的文字


备注：
```js
items: [{
    values: [2017, 2016, 2015],   // 每一个选项的 value
    displayValues: [2017, 2016, 2015],    // 对应每一个选项的显示文本，可忽略
    active: 2017,   // 当前激活选项的 value
    unit: '年',    // 单位，可忽略
  }, {
    values: monthAry.slice(),
    displayValues: monthAry.slice(),
    active: monthAry.indexOf(curMonth),
    unit: '月',
  }, {
    values: dateAry.slice(),
    displayValues: dateAry.slice(),
    active: dateAry.indexOf(curDate),
    unit: '日',
}]

```


## Events
方法名称   |    说明    |    参数    |
----    | ----      | ----        |
change | 滚动完成后会触发此事件 | 当前被激活选项所组成的对象
select | modal 模式下点击确定或取消按钮触发此事件 | 当前被激活选项所组成的对象
maskclick | modal 模式下点击灰色蒙版会触发此事件 | 无
