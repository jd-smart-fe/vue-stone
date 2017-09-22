# vue-stone
[![npm](https://img.shields.io/npm/v/vue-stone.svg?style=flat-square)](https://www.npmjs.com/package/vue-stone)
[![npm](https://img.shields.io/npm/dm/vue-stone.svg?style=flat-square)](https://www.npmjs.com/package/vue-stone)
[![GitHub issues](https://img.shields.io/github/issues/JD-Smart-FE/vue-stone.svg?style=flat-square)](https://github.com/JD-Smart-FE/vue-stone/issues)
[![npm](https://img.shields.io/npm/l/vue-stone.svg?style=flat-square)](https://github.com/JD-Smart-FE/vue-stone/blob/master/LICENSE)
> A components library for vue2.x. 一个基于 vue2.x 的组件库


## 安装

```
npm install --save vue-stone
```

**一个重要的建议：**
一方面组件库还处于开发的初级阶段，另一方面又由于作者本身能力有限，一开始未能给予组件库一个良好的功能设计。为了尽快的完善组件库，因此往往不得不在第二位版本号变动时就会发生一些不向下兼容改动。这样可能会造成在用户执行 `npm update vue-stone` 升级组件库或者重新安装项目依赖时，会获取到一个不兼容的版本，从而造成一些错误。

幸运的是，我们可以通过一个**小小的改动来规避这些风险**：

当我们执行完 `npm install --save vue-stone` 后，打开项目根目录下的 package.json，将 dependencies 字段下 `"vue-stone": "^0.4.0"` 版本号前面的 "^" 更改为 "~"，暨 `"vue-stone": "~0.4.0"`。这样我们在升级依赖包 或者 重新安装项目依赖时，就会锁定前两位版本号，从而避免了上述的问题。

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

### 按需打包组件

受 webpack 打包策略所限，我们目前并没有将按需打包做的很简练，但至少目前还是做到了，具体步骤请查阅 [按需加载组件](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/how-to-build-by-deps-in-project.md)

如果你有更好的 idea，欢迎你为 vue-stone 贡献出一份力量。

### 字体图标

默认状态下字体图标是被打包在组件库样式文件中的，不需要在额外引用。

但是如果你使用了按需打包组件，就需要再额外引用字体图标样式文件了
```js
import 'vue-stone/dist/iconfonts.css';
```

## 文档
vue-stone 组件库提供了下述组件，每个组件都带有详细的文档，组件展示可参考 [example](https://jd-smart-fe.github.io/vue-stone/)

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
- [Timepicker](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-timerpciker.md)
- [Toast](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-toast.md)

## Contribute

贡献代码请遵循[代码贡献规范](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/contribute-guide.md)

## Release Notes

[查看更新内容](https://github.com/JD-Smart-FE/vue-stone/releases)

## Todo List

[Todo List](https://github.com/JD-Smart-FE/vue-stone/blob/master/MEMO.md)
