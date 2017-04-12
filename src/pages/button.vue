<template>
  <div>

    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">
        button系列
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-disabled: </div>
        <v-button slot="main" @change="btnClickHandle" ref="button" text="左风向" icon="mode-holiday" :disabled="true"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-click: </div>
        <v-button slot="main" @change="btnClickHandle" icon="mode-holiday"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-toggle: </div>
        <v-button slot="main" ref="btnSwitch" size="lg" text="开关"  v-model="power_state" icon="mode-holiday" @change="btnSwitchHandle" type="toggle" :initStatus="true"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 互斥 </div>
      </div>
      <div slot="body" style="padding: .12rem; ">
        <v-button-group
        style="margin-bottom: 20px;"
        v-model="buttonGroup_value"
        :items="buttonGroup1"
        @change="exclusiveChangeHandle">
        </v-button-group>
        <v-button-group
        v-model="buttonGroup_value"
        :items="buttonGroup2"
        @change="exclusiveChangeHandle">
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
