# Button-switch

## Tag Name
`v-button-switch`

## Usage
```html
<v-button-switch icon="power" v-model="value"></v-button-switch>
```

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | Boolean | false | 按钮激活状态
type |  String  | 'click' | 定义按钮类型，可选值'toggle', 'click' 。
size  | String  | 'base' |  定义按钮大小，可选值 'small', 'base', 'large'。
icon  | String  | ''  |  定义按钮图标。
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle',
disabled | Boolean | false | 是否禁用按钮。
hold | Boolean | false | 值为true时，点击按钮不会改变按钮的状态，但会触发change事件。
htmlType | String | 'button' | 设置按钮原生 type 参数

<!-- longTap   | Boolean | false | 是否开启长按功能。 -->
**备注：**
1. 在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。

2. 可以使用 `hold` 参数很好的处理组件状态的异步改变。同时为了避免触发多次无意义的 `change` 事件，当 `hold` 时，多次点击按钮仅触发一次 `change` 事件，直到按钮状态被改变，或调用组件 `relive` 方法。


## Events

事件名称   |    说明   |     参数  |
----    | ----    | ----    |
change | type 属性为 click 时，点击按钮会触发事件。 type 属性为 toogle 时，按钮状态改变会触发事件。disabled 属性为 true 时，点击按钮不触发事件。 | 当前按钮的 value 值


## Methods

方法名称   |    说明   |     参数  |
----    | ----    | ----    |
update | 可改变激活按钮状态 | 参数为想要改变成为的状态，可传入`true, false, 'toggle'`。
relive | 当 `hold` 为 `true` 时，未改变按钮状态前，按钮仅能触发一次 `change` 事件，触发事件后再调用本方法，可以让按钮在下次点击时能再触发一次 `change` 事件。 一般用于异步方法失败时的回调里调用。|
