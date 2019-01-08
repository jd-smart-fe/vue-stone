# Panel

此面板组件为 CSS 容器组件，里面可以放入自定义的内容。

## Usage
```html
<v-panel>
  <div slot="header" class="c-panel-header ">
    <div class="c-panel-title">Panel Title</div>
  </div>
  <div slot="body" class="c-panel-body">
    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
  </div>
  <div slot="footer" class="c-panel-footer">
    <div > Panel Footer </div>
  </div>
</v-panel>
```

结合不同的 `class`，可满足不同的使用场景。更多示例可参考：*examples/pages/panel.vue*


## Options

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
title  | String  | - | 标题
description  | String | -  | 描述
status  | String | -  | 状态

## Events

无

## Methods

无
