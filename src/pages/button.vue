<template>
  <div>

    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">
        button系列
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-disabled: </div>
        <v-button slot="main" :disabled="true">确认</v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-click: </div>
        <v-button slot="main" @change="btnClickHandle">click</v-button>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-toggle: </div>
        <v-button slot="main" ref="btnSwitch" v-model="power_state" @change="btnSwitchHandle" type="toggle" :initStatus="true" icon="mode-holiday">toggle</v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 尺寸 </div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button slot="main" size="small" @change="btnClickHandle">小按钮</v-button>
        <v-button slot="main" size="base" @change="btnClickHandle">中按钮</v-button>
        <v-button slot="main" size="large" @change="btnClickHandle">大按钮</v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 形状 </div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button slot="main" radius="small" @change="btnClickHandle">small</v-button>
        <v-button slot="main" radius="circle" @change="btnClickHandle">circle</v-button>
        <v-button slot="main" radius="circle" icon="power" @change="btnClickHandle"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 按钮组 </div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button-group slot="main">
          <v-button @change="btnClickHandle">0</v-button>
          <v-button @change="btnClickHandle">1</v-button>
          <v-button @change="btnClickHandle">2</v-button>
          <v-button @change="btnClickHandle">></v-button>
        </v-button-group>

      </div>
    </v-panel>
  </div>
</template>

<script>

  export default {
    name: 'button',

    data() {
      return {
        power_state: true,
        buttonGroup_value: 2,
        buttonGroup1: [
          {
            text: '第一个',
            id: 1,
          },
          {
            text: '第二个',
            id: 2,
          },
          {
            text: '第三个',
            id: 3,
          },
        ],

        buttonGroup2: [
          {
            text: '第四个',
            id: 4,
          },
          {
            text: '第五个',
            id: 5,
          },
          {
            text: '第六个',
            id: 6,
          },
        ],
      };
    },

    methods: {

      btnClickHandle() {
        console.log('触发按钮点击事件');
      },

      btnSwitchHandle(state) {
        console.log(`开关按钮状态：${state}`);
      },

      exclusiveChangeHandle(index) {
        console.log(`第${index}个按钮被激活`);
      },
    },
  };
</script>

<style>



</style>
