# Loading

Loading 组件向 Vue 原型上添加了 `$loading` 属性，通过调用当前 vue 实例 `$loading` 属性的方法来使用 loading。

## Usage

调用 show(options) 传入参数

```
this.$loading.show();

this.$loading.show({
 modal: true,
 text: '正在控制',
});;
```

## Methods

| 方法名称 | 说明 | 参数 | 返回值 |
| ----   | ---- | ---- | ---- |
| show(options) | 显示弹窗 | 参考Options | 无 |
| hide() | 关闭弹窗 | 无 | 无 |

## Options

| 属性名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| text | String | 加载中 | 文字展示 |
| pos | String | 'center' | 设置loading展示位置，center：上下左右居中展示；top：在顶部展示；bottom：在底部展示；|
| duration | Int | 3000 | 设置持续时间 |
| mask | Boolean | true | 是否添加蒙层 |
