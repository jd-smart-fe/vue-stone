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
- [Alert]() (Docs unfinish)
- [Button](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button.md)
- [Button-group](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button-group.md)
- [Button-switch](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-button-switch.md)
- [Checkboard](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-checkboard.md)
- [Confirm]() (Docs unfinish)
- [Counter](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-counter.md)
- [Dayspicker](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-dayspicker.md)
- [Dialog](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-dialog.md)
- [Input](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-input.md)
- [Loading](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-loading.md)
- [Mask](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-mask.md)
- [Modes]() (Docs unfinish)
- [Panel]() (Docs unfinish)
- [Picker]() (Docs unfinish)
- [Range](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-range.md)
- [Slide]() (Docs unfinish)
- [Switch]() (Docs unfinish)
- [Timepicker]() (Docs unfinish)
- [Toast](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-toast.md)


## TODO & MEMO

[Todo List](https://github.com/JD-Smart-FE/vue-stone/blob/master/MEMO.md)
