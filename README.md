# vue-stone
[![npm](https://img.shields.io/npm/v/vue-stone.svg?style=flat-square)](https://www.npmjs.com/package/vue-stone)
[![npm](https://img.shields.io/npm/dm/vue-stone.svg?style=flat-square)](https://www.npmjs.com/package/vue-stone)
[![GitHub issues](https://img.shields.io/github/issues/JD-Smart-FE/vue-stone.svg?style=flat-square)](https://github.com/JD-Smart-FE/vue-stone/issues)
[![npm](https://img.shields.io/npm/l/vue-stone.svg?style=flat-square)](https://github.com/JD-Smart-FE/vue-stone/blob/master/LICENSE)
> A components library for vue2.x. 一个基于 vue2.x 的组件库


## 安装
`npm install --save vue-stone`

## 使用

### 使用前注意
本项目采用了 rem 布局方案，因此在引入该组件库前请在 HTML 文件 head 标签內添加下面一段 script：

```html
<script>
  (function() {
    var baseFontSize = 100;
    var baseWidth = 375;

    var set = function() {
      var clientWidth = document.documentElement.clientWidth || window.innerWidth;

      var rem = 100;
      if (clientWidth != baseWidth) {
        rem = Math.floor(clientWidth / baseWidth * baseFontSize);
      }

      document.querySelector('html').style.fontSize = rem + 'px';
    }
    set();

    window.addEventListener('resize', set);
  }());
</script>
```

### 开始使用

Import vue-stone and register components

```js
// In ES6 modules
import Stone from 'vue-stone';
import 'vue-stone/dist/vue-stone.css';

// In CommonJs
// var Stone = require('vue-stone');
// require('vue-stone/dist/vue-stone.css');

import Vue from 'vue';

Vue.use(Stone);   // register components
```

### 按需加载组件

受 webpack 打包策略所限，我们目前并没有将按需打包做的很简练，但至少目前还是做到了，具体步骤请查阅 [按需加载组件](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/how-to-build-by-deps-in-project.md)

如果你有更好的 idea，欢迎你为 vue-stone 贡献出一份力量。

## 文档
Vue-stone provide those components below:

- [Action-box](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-action-box.md)
- [Action-sheet](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-action-sheet.md)
- [Alert](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-alert.md)
- [Button](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button.md)
- [Button-group](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button-group.md)
- [Button-switch](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button-switch.md)
- [Checkboard](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-checkboard.md)
- [Confirm](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-confirm.md)
- [Counter](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-counter.md)
- [Dayspicker](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-dayspicker.md)
- [Dialog](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-dialog.md)
- [Input](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-input.md)
- [Loading](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-loading.md)
- [Mask](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-mask.md)
- [Modes](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-modes.md)
- [Panel](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-panel.md)
- [Picker](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-picker.md)
- [Range](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-range.md)
- [Slide](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-slide.md)
- [Switch](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-switch.md)
- [Timepicker](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-timerpciker.md) (Docs unfinish)
- [Toast](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-toast.md)

## Notice

v0.3.0 进行了如下的改动：

- 如果你使用 Dayspicker 组件中的 days 属性，请使用用 v-model 代替之。 days 属性在 v0.3.0 中不会在支持。

- Range 组件中采用下划线式命名的属性将会被重命名为驼峰式，如 `show_tip` 将会被重命名为 `showTip`

- Button 新增 syncHold 属性，值为 true 时会忽略 hold 属性的设置，作用和 hold 属性类似，但不具备 hold 属性改变一次状态前只会触发一次 change 事件的特性。

- 组件执行隐藏动作的方法名统一为 `hide`，组件执行显示动作的方法名统一为 `show`。
  - Action-box 和 Action-sheet 组件中 `close` 方法重命名为 `hide`， `open` 方法重命名为 `show`

## TODO & MEMO

[Todo List](https://github.com/JD-Smart-FE/vue-stone/blob/master/MEMO.md)
