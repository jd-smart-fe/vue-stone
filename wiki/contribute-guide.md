# 代码贡献规范

> 欢迎补充更多合理的规范

## 提交代码时应遵守的 commit 规范

每一个 commit 都应该清晰明了，commit 的描述应和提交的改动一致。同时为了提高 commit 质量，故进行以下约定：

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动

例如：

```
$ git commit -m "feat: add a new feature in button component"
```
## 组件贡献注意事项

仿照已有组件创建对应的组件和页面，并完善好文档

### 页面位置 examples -> pages -> ···

  - 在 examples -> pages -> App.vue 添加入口
  - 在 examples -> pages -> index.js 注册路由
  - 在 libs -> initializer.js 添加组件

### 组件位置 src -> components -> ···

  - 组件内注意指定好 name: v-···， `eg: v-panel`

### 更新 github 预览页面

  - 把最新的代码合并到分支 gh-pages 上，推到远端库