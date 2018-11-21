# Search

## Tag Name

`v-search`

## Usage

```html
<v-search v-model="message" placeholder="未输入搜索内容"></v-search>

<v-search :result="result" relation v-model="message2" placeholder="带匹配的搜索" :itemClick="clickHandler"></v-search>
```

## Options

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
v-model  | String | '' |  输入框的内容
placeholder | String | '' | 输入框没有内容时的占位字符
relation|带搜索匹配结果|false|输入匹配为true时生效
result|Array	|''|匹配结果（relation为true时生效）支持对象数组或者字符串数组形式，对象数组需包含label属性，例如：[{label: 'Apple', id: '1111'}, {label: 'Orange', id: '2222'}...] 或者 ['Apple', 'Orange'...] 
item-click|''|''|匹配结果点击事件（relation为true时生效）
top|String && (px或rem)|0.2rem|匹配结果列表距离input顶部的距离

## Methods
方法名称   |    说明    |    参数    |
----    | ----      | ----        |
input | 输入内容时触发事件，触发条件类似于原生 input 标签的 input 事件 | 当前组件输入框的内容
change | 用户离开输入框，并且输入框内容发生改变时 | 当前组件输入框的内容
