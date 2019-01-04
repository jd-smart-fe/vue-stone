<template>
  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">
        button系列
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div slot="title" class="c-panel-title ">禁用 disabled: </div>
        <v-button :disabled="true">确认</v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 尺寸 size</div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button size="small" @click.native="btnClickHandle">小按钮</v-button>
        <v-button @click.native="btnClickHandle">中按钮</v-button>
        <v-button size="large" @click.native="btnClickHandle">大按钮</v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 形状 radius</div>
      </div>

      <div slot="body" style="padding: .12rem;">
        <v-button @click.native="btnClickHandle">small</v-button>
        <v-button radius="circle" @click.native="btnClickHandle">circle</v-button>
        <v-button radius="circle" icon="v-icon-power" @click.native="btnClickHandle"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 满宽按钮 </div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button :full='true'>长按钮</v-button>
      </div>


      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> 图标 icon</div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button icon="v-icon-mode-holiday">取暖</v-button>
        <v-button icon="shirt" radius="circle" @click.native="btnClickHandle">洗衣</v-button>
        <v-button radius="circle" icon="v-icon-power" @click.native="btnClickHandle"></v-button>
        <v-button radius="circle" size="large" icon="v-icon-power" @click.native="btnClickHandle"></v-button>
        <v-button radius="circle" size="small" icon="v-icon-power" @click.native="btnClickHandle"></v-button>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="c-panel-title ">开关 button-switch </div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button-switch v-model="buttonSwitchValue">toggle</v-button-switch>
        <v-button-switch v-model="switchValue" icon="v-icon-power" radius="circle"></v-button-switch>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="c-panel-title ">Async button-switch: </div>
        <v-button-switch :hold="true" v-model="asyncSwitchValue" @change="handleAsync">确认</v-button-switch>
      </div>

      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div> Button group</div>
      </div>
      <div slot="body" style="padding: .12rem;">
        <v-button-group>
          <v-button @click.native="btnClickHandle">0</v-button>
          <v-button @click.native="btnClickHandle">1</v-button>
          <v-button @click.native="btnClickHandle">2</v-button>
          <v-button @click.native="btnClickHandle">4</v-button>
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
        asyncSwitchValue: false,
        switchValue: false,
        buttonSwitchValue: false,
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

      handleAsync(val) {
        console.log(val);

        setTimeout(() => {
          this.asyncSwitchValue = !this.asyncSwitchValue;
        }, 1000);
      },
    },
  };
</script>

<style>



</style>
