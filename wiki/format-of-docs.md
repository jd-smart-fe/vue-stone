# 组件文档规范

## 一级标题
一级标题应为组件的英文名称，首字母应大写，用短横连接多个字符

如：
```
# Button-group
```

## 二级标题

可根据组件的情况取舍以下二级标题

### `Tag Name` 标题
`Tag Name` 内容区应简洁的表示出该组件的 tag name。

如：
```
## Tag Name

`v-button`
```

### `Usage` 标题
`Usage` 内容区应表示出组件在 `html` 中的用法

如：

```html
<v-action-box v-model="value">
  <!-- slot content -->
</v-action-box>
```

### `Options` 标题
`Options` 内容区应展示出组件的可传递的属性值。

应采用表格展示，表头应包括 `属性名`,`类型`,`默认值`,`说明` 这四项。

如：

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model  | Boolean | 无 |  控制组件的显隐，true为显示
type |  String  | 'click' | 定义按钮类型，可选值'toggle', 'click' 。
full  | Boolean | false  | 按钮是否展示为满屏宽度


### `Events` 标题
`Events` 内容区应展示出组件的触发的各种事件。

应采用表格展示，表头应包括 `事件名称`,`说明`,`参数` 这三项。

如：

事件名称  |   说明   |   参数  |
----    |   ----    |    ----     |
input |  滑杆拖动时连续触发 | 无
change | 滑杆拖动结束时触发 | 当前滑杆的 value 值


### `Mehtods` 标题
`Mehtods` 内容区应展示出组件的暴露出的各种方法。

应采用表格展示，表头应包括 `方法名称`,`说明`,`参数` 这三项。

如：

方法名称   |    说明    |    参数    |
----    | ----      | ----        |
close | 关闭 Action-box 组件 | 无
open | 打开 Action-box 组件 | 无


## 一个成熟的示例

[Button-switch](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button-switch.md)
