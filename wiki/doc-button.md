## 按钮类组件：

### button

**v-button 按钮**

**属性：**

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
type |  String  | click | 定义按钮类型，可选值'toggle', 'click' 。
size  | String  | base |  定义按钮大小，可选值 'sm', 'base', 'lg'。
text  | String  | ''  |  定义按钮文本。
icon  | String  | ''  |  定义按钮图标。
disabled | Boolean | false | 是否禁用按钮。
hoverClass | String | c-btn-press | 定义按钮按下去的样式类。
disabledClass | String | c-btn-disabled | 定义disabled的样式类。
longTap   | Boolean | false | 是否开启长按功能。
initStatus | Boolean |  false |  按钮初始状态，当值为true时，按钮处于激活状态。只支持type值为toggle的按钮。
hold | Boolean | false | 按钮是否维持住当前状态。值为true时，点击按钮不会改变按钮的状态，会触发change事件。


**方法**

- update(status)
  传入参数status，来设置按钮的状态。

**事件**

- `change`:
  参数:`status` 当前按钮toggle状态。只对type值为toggle的按钮有效
  点击按钮时会触发该事件，按钮状态为disabled时不会触发事件。

- `turnOn`:
  参数:`status` 当前按钮toggle状态。只对type值为toggle的按钮有效
  toggle型按钮打开时会触发事件，按钮状态为disabled时不会触发事件。

- `turnOff`:
  参数:`status` 当前按钮toggle状态。只对type值为toggle的按钮有效
  toggle型按钮关闭时会触发事件，按钮状态为disabled时不会触发事件。



---

### counter

#### v-counter 计数器

**属性：**

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | data    |   0      |   计数器初始值，必填。
max     | Number  |   Infinity |  计数器最大值，计数若超过最大值时，加号按钮会自动置为disabled状态。
min     | Number  |   -Infinity |  计数器最小值，计数若超过最小值时，减号按钮会自动置为disabled状态。
step    | Number   |  1   | 步距，点一次加减号会加减相应的值。


v-model 为双向绑定参数，应传入一个data值。

**事件：**

- `change`:
  参数:`value` 当前计数值
  点击加号或减号都会触发该事件，按钮disabled时不会触发。

- `increase`:
  参数:`value` 当前计数值
  点击加号时会触发该事件，按钮disabled时不会触发。

- `decrease`:
 参数:`value` 当前计数值
  点击加号时会触发该事件，按钮disabled时不会触发。


---
### buttonGroup

#### v-button-group 按钮组

该按钮组为互斥按钮组，只会有一个按钮处于激活状态。


属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
items  | Array    |     无     |   按钮属性集合。
size     | String  |   base |  统一设置按钮大小。
v-modle | data, Number |  0 | 双向绑定参数，激活的按钮id。


```
buttonGroup: [
  // id值必填
  // 其余请参照button设置选项
  {
    id: 1 // 必填，当id值与v-model值相同时，按钮将会被激活。
    text: '第一个',
    icon: 'mode-holiday',
    ...
  },

  {
    id: 2 // 必填，当id值与v-model值相同时，按钮将会被激活。
    text: '第二个',
    icon: 'mode-holiday',
    ...
    ...
  },
],

```

**事件：**

- `change`:
  参数:`value` 当前被激活按钮的索引
  点击按钮组内按钮会触发该事件。
