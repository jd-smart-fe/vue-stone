## 遮罩组件：

### range

**v-range**

**属性：**

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
v-model  | Number 或 Object |  |  在 有级 状态下 value可以传入一个json对象，其属性必须是一一对应的 value 及 text，例:{ value: 20, text: '中档'};这种情况下 滑动改变值后 返回的值也是一个如上格式的json对象。
min | Number | 0 | 无极时的最小值
max | Number | 50 | 无极时的最大值
show_tip | Boolean | true | 滑动时是否提示，默认提示
tooltip | Function | 返回当前值 | 滑动时是否提示的文案，默认提示当前value值
is_step | Boolean | false | 是否有级，默认时无极
dots | Array | [] | 滑杆下面的文字信息列表,有级时 以此来判断份几级，dots是一组json对象组成的数组。包含的字段: value、text、icon;，例: [{value: 10, text: '低档', icon: model-cool},{value: 20, text: '中档', icon: model-cool}];
disabled | Boolean | false | 是否禁用滑杆，默认不仅用
disappear | Boolean | false | 是否另滑杆上的控制球消失，默认不消失


**事件**

- `input`:
  参数: `val` value值。

  拖动时数值发生改变就触发。

- `change`:
  参数: `val` value值。

  拖动结束时触发。
