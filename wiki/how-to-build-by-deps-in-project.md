## 关于根据实际项目需求进行按需打包

组件库 vue-stone 默认情况 dist 目录下的 vue-stone.js 包含了所有的组件，在实际项目中可能更希望能够根据项目的实际需要进行打包，而不是全部的组件，这就需要针对这种情况进行裁剪。

要满足这一点，需要借助 webpack 自带的`ContextReplacementPlugin`。

简单得说，将在项目中需要用到的组件，构成一个正则表达式，传入`ContextReplacementPlugin`的参数即可。

```javascript
// in project, (code snip 1)
Vue.use(Store, {
  components: ['panel', 'loading']
});

// webpack.config.js, (code snip 2)
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const intactify = require('vue-stone/libs/intactify');
const dependencies = require('vue-stone/libs/dependencies');

let components = ['panel', 'loading']; // 项目中所要用到的组件列表
components = intactify(dependencies, components); // 构造真实的组件列表
plugins: [
  // ...
  new ContextReplacementPlugin(
    /vue-stone\/src\/components$/,    // vue-stone 库单文件组件所在目录
    new RegExp(`(${components.join('|')})\.vue$`),
  ),
  // ...
]
```

注意, 受限于 ES6 和 Webpack 的设计, 模块的设计思想必须是静态化的, 使得打包工具能够在编译期就能确定模块的依赖关系.

所以回到按需打包组件这个场景下, 必须在项目构建阶段就需要完成确定 `ContextReplacementPlugin` 的参数值. 这也是为什么按需打包功能并没有在 vue-stone 组件库中完成的原因所在. 同时也意味着当webpack 处于运行状态时, 动态添加删除程序中(如 code snip 1所示)的所用到的组件列表时, 将不会生效, 必须通过重启 Webpack 构建进程方可.

## Referrence

* [ContextReplacementPlugin](https://webpack.js.org/plugins/context-replacement-plugin/)

EOF.


