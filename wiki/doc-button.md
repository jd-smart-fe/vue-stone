# Button

## Release Notes

- v0.5.1: 修改 icon 属性的入参，现在需要传入完整的 icon 样式类名。

## Tag Name
`v-button`

## Usage
```html
<v-button>Button</v-button>

<v-button
  size="large"
  radius="circle"
  icon="v-icon-power"
></v-button>
```

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
size  | String  | 'base' |  定义按钮大小，可选值 'small', 'base', 'large'。
full  | Boolean | false  | 按钮是否展示为满屏宽度
icon  | String  | ''  |  定义按钮图标，传入完整的图标样式类名。
radius | String | 'small' | 定义圆角大小， 可选 'small', 'circle'。
disabled | Boolean | false | 是否禁用按钮。
htmlType | String | 'button' | 设置按钮原生 type 参数

**备注：**
在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。
