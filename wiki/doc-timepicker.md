# Timepicer

一个时间选择器，只能选择 时 和 分。

## Usage
```html
<v-timepicker :hour="10" :min="30"></v-timepicker>
```

## Options
属性名   |    类型      |     默认值     |     说明
----    | ----         | ----    | ----    |
hour    |  Number     |  0  |   设置初始的 小时
min     |  Number     |  0  |   设置初始的 分钟
rotate_effect  |  Boolean | false | 是否开启 3d 模式

## Event
事件名称   |    说明      |     参数
----    | ----         | ----    |
change  |  滑动完成后触发此事件 | 滑动完成后最新的选择时间  例：`{displayValue: [1, 2], value: [1, 2]}`
