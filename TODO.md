

工程配置相关：
* 测试框架注入 helper
* vue 的自动化测试相关。




组件相关：

Panel.vue  undergoing    写了一部分。
* 

border 1px 和 solid 的 mixin    ✔
transition 的 mixin         ✔


switch.vue

* 改写 state 到 power 的形式。
* props 禁止改动。            ✔
* 状态:
** on 和 off，如果不传默认 off， 如果传了就是传了的值。  字符串，枚举。 ✔
** disable， 默认 false， boolean  ✔

* 事件  change   ✔
* on color, off color,  ✔
* disable color  禁用样式。    @chanpin

测试相关：
* 单项数据流，如何测试组件？      ✔  改写了 new vue 的形式。
* switch 的点击，交互其实还没加上状态。

////

有这个想法，去掉 e2e 测试？ 只保留 karma 好了。

-----

* editorconfig 这个貌似是还没发挥出作用。

----

数据的双向绑定.  v-model

v-model: 1. 存在 `value` prop  2. 子组件触发 input 事件