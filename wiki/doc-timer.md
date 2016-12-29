# 定时组模

**`v-timer`**


```html
<v-timer :options="options"></v-timer>
```

## 属性：

属性名   |    类型   |     默认值     |     说明
----    | ----    | ----    | ----    |
options |  Object  |  | 必须值，定义组件内容


相关用法，请看下面示例

## 方法：

- `getValue()` 返回值为组件内部的值

- `jumpMainpage()` 跳会组件首页

## 事件

- `delete` 当点击删除按钮并确定时，触发该事件。


## 示例：


### 开关类定时模块：

功能单一，只需要定时开启或关闭。

```js
options: {
  // 定义主页内容
  mainpage: {
    task_name: '插座定时开关', // 定时任务名称
    time_task_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
    pmg_setting: -1, // 执行结果通知。-1不通知，0仅失败通知，1均通知。
    show_delete: true, // 非必需，是否显示删除按钮，默认false，不显示,
    simple: { // 开启简单命令模式界面，会忽略复杂任务页
      title: '定时任务', // 开关面板标题
      status: false, // 开关状态
      hideDefault: false, // 是否隐藏默认的开关，主要用于想插入自定义组件，又不想要默认的开关组件
    },
  },
}

```
若想自定义开关组件，先通过hideDefault参数隐藏默认的开关，然后通过slot自定义组件。

```js
options: {
  mainpage: {
    ...
    ...
    simple: {
      hideDefault: true, // 隐藏默认的开关
    },
  },
},

```

```html
<v-timer :options="options">
  <!-- 注意 slot 值为 simple -->
  <v-panel slot="simple" class="c-panel">
    <div slot="header" class="c-panel-header row-1 u-cross-center">我是标题</div>
    <div slot="body" class="c-panel-body row-1 u-cross-center">
      <div>开关</div>
      <div>
        <v-button text="开关" type="toggle"></v-button>
      </div>
    </div>
  </v-panel>

</v-timer>

```

###多任务定时模块：
#### Tips：
taskpage支持的模组：`onOff` , `modes`, `range`, `counter`

```js
options: {
  // 定义主页内容
  mainpage: {
    task_name: '插座定时开关',
    time_task_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
    pmg_setting: -1,
    show_delete: true, //非必需，是否显示删除按钮，默认false，不显示,
  },

  // 定义多任务页内容
  taskpage: [{ // 注意：组件先后顺序会体现在页面上
    name: 'onOff', // 如果需要开关，必须写在第一位
    title: '自定义开关名称',
    value: 0,
  }, {
    name: 'modes', // 对应模板组件名称，目前支持仅支持'onOff', 'modes', 'range', 'counter'
    title: '自定义名称', // 任务面板的标题
    value: 1,   // 其余参数均按照正常组件参数传入
    items: [{
      text: '智能模式',
      icon: 'mode-smart',
      id: 1,
    }, {
      text: '速冷模式',
      icon: 'mode-cool',
      id: 2,
    }, {
      text: '速冻模式',
      icon: 'mode-freeze',
      id: 3,
    }],
  }, {
    name: 'range',
    title: '风速设置',
    value: 100,
    min: 0,
    max: 1000,
    tooltip(val) {
      return `${val}°C`;
    },
    dots: [{
      icon: 'mode-holiday',
      text: '啊啊',
    }, {
      icon: 'mode-freeze',
      text: '高温',
    }],
  }, {
    name: 'counter',
    title: '脱水次数',
    value: 5,
    max: 10,
    min: 0,
    step: 1,
  }],
};
```
