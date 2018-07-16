# Controlcenter

## Tag Name

`v-control-center`

## Usage

```html
<v-control-center
  ref="controlCenter"
  top_text="上部"
  :top_icon="topIcon"
  bottom_text="下部"
  :bottom_icon="bottomIcon"
  left_text="左部"
  :left_icon="leftIcon"
  right_text="右部"
  :right_icon="rightIcon"
  center_text="OK"
></v-control-center>
```

## Options

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
top_icon  | String | 主页图标 |  上部的图标
top_text  | String | 主页 |  上部的文字
bottom_icon  | String | 静音图标 |  下部的图标
bottom_text  | String | 静音 |  下部的文字
left_icon  | String | 菜单图标 |  左部的图标
left_text  | String | 菜单 |  左部的文字
right_icon  | String | 返回图标 |  右部的图标
right_text  | String | 返回 |  右部的文字
center_text  | String | OK |  中间的文字

## Events
方法名称   |    说明    |
----    | ----      |
topHandle | 点击上部时触发此事件
bottomHandle | 点击下部时触发此事件
leftHandle | 点击左部时触发此事件
rightHandle | 点击右部时触发此事件
centerHandle | 点击中间时触发此事件

## Usage

```js
mounted() {
  this.$refs.controlCenter.$on('topHandle', () => {
    console.log('触发topHandle事件');
  });
  this.$refs.controlCenter.$on('bottomHandle', () => {
    console.log('触发bottomHandle事件');
  });
  this.$refs.controlCenter.$on('leftHandle', () => {
    console.log('触发leftHandle事件');
  });
  this.$refs.controlCenter.$on('rightHandle', () => {
    console.log('触发rightHandle事件');
  });
  this.$refs.controlCenter.$on('centerHandle', () => {
    console.log('触发centerHandle事件');
  });
},
```
