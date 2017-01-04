# 过渡组件

**v-transition**

```html
<v-transition name="fade">
  <div class=""></div>
</v-transition>
```

```html
<v-transition enter="bounceIn" leave="bounceOut">
  <div class=""></div>
</v-transition>

```

##使用过渡效果时
属性

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
name |  String  |  | 必须值，定义组件过渡效果
