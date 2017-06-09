## 按钮类组件：

### button

**v-button 按钮**
```html
<v-button>
  我是按钮
</v-button>

<v-button icon="mode-holiday" radius="circle"></v-button>
```
在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。

**属性：**

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
type |  String  | 'click' | 定义按钮类型，可选值'toggle', 'click' 。
size  | String  | 'base' |  定义按钮大小，可选值 'small', 'base', 'large'。
full  | Boolean | false  | 按钮是否展示为满屏宽度
icon  | String  | ''  |  定义按钮图标。
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle',
disabled | Boolean | false | 是否禁用按钮。
htmlType | String | 'button' | 设置按钮原生 type 参数


**CSS hock:**
为方便覆写样式，以下为钩子样式类。

```CSS
.c-btn  /*按钮基本样式*/
.c-btn-hover  /*按钮按下样式*/
.c-btn-disabled  /*按钮禁用样式*/
```
