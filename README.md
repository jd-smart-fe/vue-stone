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

## 使用

### 本项目版本号规定

在本项目发布 1.0.0 版本之前，第二位版本号的更新**将不向下兼容**，第三位版本号向下兼容，通常为优化或 BUG 修复更新。

因此请**注意这里**：将 package.json 中 dependencies 字段下 `"vue-stone": "^0.4.0"` 版本号前面的 "^" 更改为 "~"，暨 `"vue-stone": "~0.4.0"`。这样再执行 npm install 时，将只会安装第三位版本号的最新版。

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
import Stone from 'vue-stone';
import 'vue-stone/dist/vue-stone.css';

// 如果你需要使用组件库中字体图标，请单独引入字体图标的 CSS 文件
// import 'vue-stone/dist/iconfonts.css';

import Vue from 'vue';

Vue.use(Stone);   // register components
```

### 按需打包组件

受 webpack 打包策略所限，我们目前并没有将按需打包做的很简练，但至少目前还是做到了，具体步骤请查阅 [按需加载组件](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/how-to-build-by-deps-in-project.md)

如果你有更好的 idea，欢迎你为 vue-stone 贡献出一份力量。


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
- [Timepicker](https://github.com/jd-smart-fe/vue-stone/blob/master/wiki/doc-timepicker.md)
- [Toast](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-toast.md)
- [Control-center](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-control-center.md)
- [Search](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-search.md)
- [Textarea](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-textarea.md)
- [Icon](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/doc-icon.md)
## Contribute

贡献代码请遵循[代码贡献规范](https://github.com/JD-Smart-FE/vue-stone/blob/master/wiki/contribute-guide.md)

## Release Notes

[查看更新内容](https://github.com/JD-Smart-FE/vue-stone/releases)
