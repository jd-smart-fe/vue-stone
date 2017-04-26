## 开关按钮：

### button-switch

**v-button-switch 按钮**
```html
<v-button-switch v-model="value">
  开关
</v-button-switch>

<v-button icon="power" radius="circle" v-model="switchValue"></v-button>
```
在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。

**属性：**

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

可以使用 `hold` 参数很好的处理组件状态的异步改变。同时为了避免触发多次无意义的 `change` 事件，当 `hold` 时，多次点击按钮仅触发一次 `change` 事件，直到按钮状态被改变，或调用组件 `relive` 方法。


**事件：**
- `change`:
      参数:`status`，操作完成后按钮当前 v-model 绑定值的参数。按钮禁用点击按钮时不触发该事件。


**方法：**
- `update(value)`
      可改变激活按钮状态，`value` 参数为即将改变的状态。

- `relive()`
      当 `hold` 为 `true` 时，未改变按钮状态前，按钮仅能触发一次 `change` 事件，触发事件后再调用本方法，可以让按钮在下次点击时能再触发一次 `change` 事件。 一般用于异步方法失败时的回调。


**CSS hock：**

为方便覆写样式，以下为钩子样式类。

```CSS
.c-btn  /*按钮基本样式*/
.c-btn-hover  /*按钮按下样式*/
.c-btn-disabled  /*按钮禁用样式*/
.c-btn-icon-only  /*仅有图标时 圆形按钮额外样式*/

.c-btn-on  /*按钮激活状态样式*/
.c-btn-on.c-btn-hover  /*按钮激活时按下样式*/
```
