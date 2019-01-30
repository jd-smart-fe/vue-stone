# Modes
卡片样式选择设备模式
## Release Notes

- v0.5.1: 修改 icon 属性的入参，现在需要传入完整的 icon 样式类名。

## Tag Name

`v-modes`

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model |  number  |  -1  |  当前激活的按钮id
numberal |  number | 4  |  每行显示的按钮数量，可为 2，3，4
more  |  String  |  '' |  展开面板按钮上的提示文案
items | Array |  必传参数 | 配置每个按钮，下面会详细介绍
iconPosition | String |  'left' | 可传属性值为‘top’、'right'、'bottom'、'left'，表示icon在文字的不同位置。
type  | Sting | 'Single' | 默认表示模式选项互斥显示|


注：
```js
items: [{
    text: '标准加热',   // 按钮文案
    icon: 'v-icon-mode-holiday',    // 按钮图标   需引入组件图标库
    id: 1,    // 按钮唯一 id
    disabled: true // 是否禁用当前模式，默认不禁用
  }, {
    text: '快速加热',   // 按钮文案
    icon: 'v-icon-mode-holiday',   // 按钮图标     需引入组件图标库
    id: 2,    // 按钮唯一 id
  }, {
    text: '超级加热',   // 按钮文案
    icon: 'v-icon-mode-holiday',   // 按钮图标     需引入组件图标库
    id: 3,    // 按钮唯一 id
}]
```

## Events

方法名称   |    说明   |     参数
----    | ----    | ----
change |  切换激活按钮时会触发该事件 |  2个参数（当前激活按钮的id, 当前激活按钮的对象）
