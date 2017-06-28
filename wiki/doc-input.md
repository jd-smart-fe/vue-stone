# Input

## Tag Name

`v-input`

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | String    |   ''      |   输入框的内容
placeholder | String | '' | 输入框没有内容时的占位字符
htmlName | String | '' | 原生 input 标签的 name 属性


该组件暂时只支持 'text' 型的 input 输入框。

## Events

事件名称   |    说明    |    参数    |
----    | ----      | ----        |
input | 输入内容时触发事件，触发条件类似于原生 input 标签的 input 事件 | 当前组件输入框的内容
change | 用户离开输入框，并且输入框内容发生改变时 | 当前组件输入框的内容
