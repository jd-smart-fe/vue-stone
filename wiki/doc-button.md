# Button

## Tag Name
`v-button`

## Usage
```html
<v-button>Button</v-button>
```

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
size  | String  | 'base' |  定义按钮大小，可选值 'small', 'base', 'large'。
full  | Boolean | false  | 按钮是否展示为满屏宽度
icon  | String  | ''  |  定义按钮图标。
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle'。
disabled | Boolean | false | 是否禁用按钮。
htmlType | String | 'button' | 设置按钮原生 type 参数

**备注：**
在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。
