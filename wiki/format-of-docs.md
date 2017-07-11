# Component-name

## Usage

*此处应简单的注明组件用法。*

```html
<v-button-switch icon="power" v-model="value"></v-button-switch>
```

## Options

*此处用表格展示出所有的组件可配置属性*

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | Boolean | false | 按钮激活状态
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle',
options | Object    | {}    | 如果有配置复杂的属性，应在表格下面备注说明。


*此处用备注说明表格中无法描述清楚的属性*

**备注：**

1. 在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。

2. options 配置：
```js
options: {
  title: 'title',  // 应详细的说明每一项属性，有默认值的应说明默认值
  desc: 'This is desc'  // 组件的属性， 默认值 'description'
}
```

## Events

*此处用表格展示出所有的组件的事件*

事件名称   |    说明   |     参数  |
----    | ----    | ----    |
change | type 属性为 click 时，点击按钮会触发事件。 type 属性为 toogle 时，按钮状态改变会触发事件


## Methods

*此处用表格展示出所有的组件的方法*

方法名称   |    说明   |     参数  |
----    | ----    | ----    |
update | 可改变激活按钮状态 | 参数为想要改变成为的状态，可传入`true, false, 'toggle'`。
