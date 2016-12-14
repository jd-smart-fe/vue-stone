## 模态组件：

### modal

**v-modal**

**属性：**

属性名   |    类型    |    默认值    |   说明
----    | ----    | ----    | ----    |
showModal | Boolean | false | 是否显示摸态框
option |  Object  |  Object |  展示 标题、信息、按钮文本、响应事件。

option说明
```
options : {
    title：标题,
    text：内容信息,
    buttons: [
          {
            text: '左按钮文本',
            callback() {
                按钮点击后需要响应的回调方法，设置callback后默认事件无法监听
            },
          },
          {
            text: '右按钮文本',
            callback() {
                按钮点击后需要响应的回调方法，设置callback后默认事件无法监听
            },
          },
    ],
}
```

**事件**
- `input`:
  参数:`无`
  点击蒙版出发事件。

**默认事件**
- `left`:
  参数:`无`
  左按钮点击事件。
- `right`:
  参数:`无`
  右按钮点击事件。

单按钮监听`left`事件

<font color="#ff6375">目前只支持1-2个按钮</font>
---