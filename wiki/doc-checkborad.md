## checkboard：

**v-checkboard**

单选模式：
```html
<v-checkboard v-model="value">
  <div slot="item" data-value="item1">
    item1
  </div>
  <div slot="item" data-value="item2">
    item2
  </div>
  <div slot="item" data-value="item3">
    item3
  </div>
  <div slot="item" data-value="item4">
    item4
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
  <div slot="item" data-value="item1">
    item1
  </div>
  <div slot="item" data-value="item2">
    item2
  </div>
  <div slot="item" data-value="item3">
    item3
  </div>
  <div slot="item" data-value="item4">
    item4
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
*每个选项必须添加属性 `data-value`，且值唯一*

**属性：**

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | Number, String 或 Array | 0 | 该值双向绑定了当前激活的选项的 data-value 的值。当该组件为复选模式时，请传入一组由选项 data-value 值组成的数据。
multi | Boolean | false | 值为 true 是为复选，反之为单选。
htmlName | String | "" | input原生name值
