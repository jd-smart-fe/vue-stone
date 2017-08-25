# MEMO

## Todo

* [ ] 有些组件依赖与个别icon，如 checkboard 选中状态下的小对勾。应当把这些组件必须的 icon 和 非必需 icon 分别对待。
  * [x] checkborad
  * [ ] Loading

* [ ] Dialog 组件点击返回 promise

* [ ] 创建公共样式解决 1px border 问题

* [ ] 组件库主页

## Rules

- 事件及方法名称尽可能的统一，比如说组件状态发生改变尽可能的统一使用 `change` 作为事件名。

## Thinking


* [ ] Button 和 Switch 组件中属性 hold === true 时，点击按钮，按钮状态不会发生改变，同时会触发一次 `change` 事件。 `change` 这个单词从语义上理解是 `改变`，但此时按钮状态未发生改变，却触发了一个叫做 “change” 的事件，这里这个事件名称是否合理？或者只有在按钮发生状态改变的时候才会触发 `change` 事件？

## Release notes
* [x] dialog 改为普通组件，添加slot 区域
* [x] confirm 和 alert 的 show 方法返回 promise 对象。
* [x] range 组件 isStep 开启的情况下，样式显示更加合理。
* [x] 额外单独打包一份 iconfonts.css
* [x] dialog 添加过渡动画
* [x] mask 组件添加默认过渡动画，shown 属性更改为 v-model，添加 transition 属性( 可配置 transition name 属性值)
* [x] 修复 timepicker 样式bug
