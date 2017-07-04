# Action-sheet

## Tag Name

`v-action-sheet`

## Usage

```html
<v-action-sheet v-model="shown" :items="items" >
</v-action-sheet>
```

## Options

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
v-model  | Boolean | 无 |  控制组件的显隐，true为显示
items | Array |  `[{ text: '确定' }]` |  可配置多个按钮


items 结构：
```js
items: [
  {
    text: '编辑', // 按钮文案
  }, {
    text: '删除',
    color: 'red', // 按钮颜色 可传递16位色。默认 #2c3e50;
  },
],

```

## Methods
方法名称   |    说明    |    参数    |
----    | ----      | ----        |
hide | 关闭 Action-box 组件 | 无
show | 打开 Action-box 组件 | 无
