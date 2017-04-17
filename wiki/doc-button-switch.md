## 按钮类组件：

### button

**v-button 按钮**
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
type |  String  | 'click' | 定义按钮类型，可选值'toggle', 'click' 。
size  | String  | 'base' |  定义按钮大小，可选值 'small', 'base', 'large'。
icon  | String  | ''  |  定义按钮图标。
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle',
disabled | Boolean | false | 是否禁用按钮。
hold | Boolean | false | 按钮是否维持住当前状态。值为true时，点击按钮不会改变按钮的状态，会触发change事件。
htmlType | String | 'button' | 设置按钮原生 type 参数

<!-- longTap   | Boolean | false | 是否开启长按功能。 -->


**CSS hock:**
为方便覆写样式，以下为钩子样式类。

```CSS
.c-btn  /*按钮基本样式*/
.c-btn-hover  /*按钮按下样式*/
.c-btn-disabled  /*按钮禁用样式*/
.c-btn-icon-only  /*仅有图标时 圆形按钮额外样式*/

.c-btn-on  /*按钮激活状态样式*/
.c-btn-on.c-btn-hover  /*按钮激活时按下样式*/
```

**事件：**
- `change`:
  参数:`status`，操作完成后按钮当前 v-model 绑定值的参数。按钮禁用点击按钮时不触发该事件。
