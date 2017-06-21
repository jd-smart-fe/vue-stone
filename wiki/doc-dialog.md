# Modal

## Tag Name

`v-modal`

## Options

属性名   |    类型    |    默认值    |   说明
----    | ----    | ----    | ----    |
showModal | Boolean | false | 是否显示摸态框
option |  Object  |  Object |  展示 标题、信息、按钮文本、响应事件。

option说明
```js
options : {
    title：标题,
    description：描述,
    isModal: true,//true模态,false非模态(不传默认是true)
    buttons: [
          {
            text: '左按钮文本',
          },
          {
            text: '右按钮文本',
          },
    ],
}
```

## Events
事件名称   |    说明    |  参数
----    | ----       | ----    |
maskClick | 点击蒙版出发事件  | 无
defaultClick |  左按钮点击事件  |  无
primaryClick | 右按钮点击事件  | 无

单按钮监听`defaultClick`事件

<font color="#ff6375">目前只支持1-2个按钮</font>
---
