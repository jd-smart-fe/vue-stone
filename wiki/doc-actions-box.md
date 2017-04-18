## 互动组件：

### action-box

**v-action-box**

```html
<v-action-box :v-model="value">
  <!-- slot 内容区 -->
</v-action-box>

```

**属性：**

属性名   |    类型    |    默认值    |   说明
----    | ----      | ----        | ----    |
v-model  | Boolean |  |  控制组件的显隐，true为显示

**方法：**
通过组件的 close(), open() 方法来控制显隐。
