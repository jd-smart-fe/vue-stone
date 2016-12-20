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
    description：描述,
    isModal: true,//true模态,false非模态(不传默认是true)
    buttons: [
          {
            text: '左按钮文本',
            callback() {
                按钮点击后需要响应的回调方法
            },
          },
          {
            text: '右按钮文本',
            callback() {
                按钮点击后需要响应的回调方法
            },
          },
    ],
}
```

**事件**
- `maskClick`:
  参数:`无`
  点击蒙版出发事件。

**默认事件**
- `defaultClick`:
  参数:`无`
  左按钮点击事件。
- `primaryClick`:
  参数:`无`
  右按钮点击事件。

单按钮监听`defaultClick`事件

<font color="#ff6375">目前只支持1-2个按钮</font>
---
