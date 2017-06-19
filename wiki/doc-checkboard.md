# Checkboard：

## Tag Name

`v-checkboard`

## Usage

**每个选项必须添加属性 `data-value`**

你可以通过一个简单的 for 循环来写出所有的 item。

单选模式：
```html
<v-checkboard v-model="value">
  <div v-for="i in list" slot="item" :data-value="i.value">
    {{ i.text }}
  </div>
</v-checkboard>
```
```js
data() {
  return {
    value: 'item1',
  };
},
```

复选模式：
```html
<v-checkboard v-model="value" :multi="true">
  <div v-for="i in list" slot="item" :data-value="i.value">
    {{ i.text }}
  </div>
</v-checkboard>
```
```js
data() {
  return {
    value: ['item1', 'item3'],
  };
},
```

组件绑定的值为 data-value 的值，但同时你令你的组件显示出不同于 data-value 的值。如：
```html
<v-checkboard v-model="value" :multi="true">
  <div slot="item" data-value="realValue">
    this is display value
  </div>
</v-checkboard>
```




## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | Number, String 或 Array | 0 | 该值双向绑定了当前激活的选项的 data-value 的值。当该组件为复选模式时，请传入一组由选项 data-value 值组成的数据。
multi | Boolean | false | 值为 true 是为复选，反之为单选。
htmlName | String | "" | input原生name值
