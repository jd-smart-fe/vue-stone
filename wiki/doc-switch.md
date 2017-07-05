# Switch

## Tag Name

```html
<v-switch></v-switch>
```

## Options
属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
v-model | Boolean | 0 | 当前开关状态
disabled | Boolean | false | 是否将开关置为禁用状态
hold | Boolean | false | 值为true时，点击按钮不会改变按钮的状态，但会触发change事件。

**备注：**
1. 可以使用 `hold` 参数很好的处理组件状态的异步改变。同时为了避免触发多次无意义的 `change` 事件，当 `hold` 时，多次点击按钮仅触发一次 `change` 事件，直到按钮状态被改变，或调用组件 `relive()` 方法。

## Events
事件名   |    说明    |   参数
----    | ----      | ----        |
change  | 点击开关按钮时触发此事件 | 当前开关的状态


## Methods
方法名   |    说明    |   参数
----    | ----      | ----        |
update(p)  | 更新开关到指定状态 | 可传入 true, false 或者 'toggle'
relive | 当 `hold` 为 `true` 时，未改变按钮状态前，按钮仅能触发一次 `change` 事件，触发事件后再调用本方法，可以让按钮在下次点击时能再触发一次 `change` 事件。 一般用于异步方法失败时的回调里调用。| |
