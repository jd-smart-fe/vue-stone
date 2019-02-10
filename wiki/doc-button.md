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

## 代码演示
禁用按钮
```html
<v-button :disabled="true">禁用按钮</v-button>
```

按钮大小
```html
<v-button>默认按钮</v-button>
<v-button size="small">小按钮</v-button>
<v-button size="large">大按钮</v-button>
```

按钮形状
```html
<v-button>默认形状</v-button>
<v-button radius="circle" @click.native="btnClickHandle">圆角按钮</v-button>
<v-button radius="circle" icon="v-icon-power"></v-button>
```

满宽按钮
```html
<v-button :full='true'>长按钮</v-button>
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
borderColor | String | '' | 默认是显示主题色，可以配置按钮的边框颜色

**备注：**
在没有文本的情况下，传入 icon 参数且 radius 设置为 circle 按钮会变成圆形。
