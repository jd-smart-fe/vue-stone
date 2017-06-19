# Counter

## Tag Name

`v-counter`

## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
v-model | Number    |   0      |   计数器初始值，必填。
max     | Number  |   Infinity |  计数器最大值，计数若超过最大值时，加号按钮会自动置为disabled状态。
min     | Number  |   -Infinity |  计数器最小值，计数若超过最小值时，减号按钮会自动置为disabled状态。
step    | Number   |  1   | 步距，点一次加减号会加减相应的值。


## Events

事件名称   |    说明    |    参数    |
----    | ----      | ----        |
change | 点击加号或减号都会触发该事件，按钮disabled时不会触发。 | 当前计数值
increase | 点击加号时会触发该事件，按钮disabled时不会触发。 | 当前计数值
decrease | 点击减号时会触发该事件，按钮disabled时不会触发。 | 当前计数值
