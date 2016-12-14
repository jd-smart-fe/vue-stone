## 关于制作字体图标

当前 src/styles/fonts 中已经存在部分图标，但肯定是远远不能满足实际项目需求，所以如果后期迭代过程中需要新增或删除字体的话，可以按照以下方式来进行。

1. 在 [iconfont](http://www.iconfont.cn/)  找到项目中需要的图标，点击下载，颜色选择 *#000*，大小选设置为*200*，下载 *SVG 格式图标* ，必须为 SVG 格式。
2. 打开 [icomoon](https://icomoon.io/app/#/select)，点击左上角 *Import Icons* 按钮，上传该项目`src/styles/fonts`目录下的`selection.json` 文件，这时会提示导入成功。
3. 继续上传在第一步中所找到的 SVG 图标，成功后，点击对应图标添加进来，之后点击右下角*Generator Font* 。

完成以上三步，此时应该是会得到一个压缩包，包含了*字体文件*，demo，更新后的`selection.json`以及更新后的`style.css`。将*字体文件*，`selection.json`，`style.css`中新增的内容拷贝至本项目对应目录。

如果操作正常，那么此时应当是可以使用新添加进来的图标。

---

## mask参数及事件

### 参数

shown：true显示，false隐藏

### 默认事件

input：点击mask触发

---

## modal参数及事件

### 组件属性

showModal: true显示摸态框，false隐藏模态框

### 传递参数

```
options : {
    title：标题,
    text：内容信息,
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

### 默认事件

left：左按钮点击事件

right：右按钮点击事件

单按钮监听left事件

<font color="#ff6375">重要：目前只支持1-2个按钮</font>