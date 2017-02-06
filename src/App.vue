<template>
  <div id="app">

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">dayspicker</div>
      <div slot="body" class="c-panel-body row-5 u-cross-center">
        <v-dayspicker ref="dayspicker" :days="dayspicker_list">
        </v-dayspicker>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">range - noStep : dots is objects</div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="range"
          v-model="range_data.value"
          :min="range_data.min"
          :max="range_data.max"
          :tooltip="range_data.tooltip"
          :is_step="range_data.isStep"
          :dots="range_data.dots"
        >
        </v-range>
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="rangeNumber"
          v-model="range_data_number.value"
          :min="range_data_number.min"
          :max="range_data_number.max"
          :tooltip="range_data_number.tooltip"
          :is_step="range_data_number.isStep"
          :dots="range_data_number.dots"
        >
        </v-range>
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="rangeJson"
          v-model="range_data_json.value"
          :is_step="range_data_json.isStep"
          :dots="range_data_json.dots"
        >
        </v-range>
      </div>
    </v-panel>

    <v-panel >
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title">Switch: </div>
        <v-switch slot="main" v-model="switch_state" ref="switch"></v-switch>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">Power: </div>
        <v-power slot="main" ref="power" :hand="true" v-model="power_state"></v-power>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">counter:
          <div class="temperature-number">
            {{ countNumber }}
          </div>
        </div>
        <v-counter slot="main" ref="counter" :max="10" :min="0" :step="1" :longTap="true" v-model="countNumber"></v-counter>
      </div>
    </v-panel>

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
        <div class="">
          互斥
        </div>
      </div>
      <div slot="body" style="
      padding: .12rem;
      ">
        <v-button-group
        style="
          margin-bottom: 20px;
        "
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

    <div class="c-panel">
      <div id='picker_value'
      style="
      width: 100%;
      height: 30px;
      font-size: 20px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      " >
        {{ picker_value }}
      </div>
      <v-picker ref="picker" :unit="picker_unit" :head_direction="head_direction" :display="picker_display" :shown="pickerModal"  @change="pickerHandle" :items="picker_items" :rotate_effect="true"></v-picker>
    </div>


    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">Panel Header</div>
        <div class="c-panel-extra">
          <span class='icon icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body">
        Panel Body Content
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">模式设置</div>
      </div>
      <div slot="body" class="c-panel-body u-without-padding">

        <!--  <v-modes v-model="grid_active_id" ref="modes"
          :numberal="2" more="更多设置" :items="grid_data_2"
        ></v-modes>
        <div class="space"></div> -->

        <v-modes v-model="grid_active_id" ref="modes"
          :numberal="3" more="更多设置" :items="grid_data_3"
        ></v-modes>
        <div class="space"></div>

        <!--
        <v-modes v-model="grid_active_id" ref="modes"
          :numberal="4"  :items="grid_data_4"></v-modes>
        -->
      </div>
    </v-panel>
    <!--<v-mask :shown="shown" ref="mask">
    </v-mask>-->
    <v-dialog ref="dialog" :showDialog="showDialog" :options="dialogOptions">
    </v-dialog>

    <v-panel >
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title">模态: </div>
        <v-switch slot="main" v-model="switch_state" ref="switch_dialog"></v-switch>
      </div>
    </v-panel>


    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">操作表</div>
        <v-button ref="btn_actions" text="actions"></v-button>
      </div>
    </v-panel>

    <!-- <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">过渡效果／动画效果</div>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button text="过渡效果" ref="btn_transition"></v-button>
        <v-transition name="fade">
          <div v-show="transition_status" style="
          width: .5rem;
          height: .5rem;
          background-color: green;
          ">
          </div>
        </v-transition>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button text="过渡效果"></v-button>
        <v-transition name="fade" time="1">
          <div v-show="transition_status" style="
          width: .5rem;
          height: .5rem;
          background-color: green;
          ">
          </div>
        </v-transition>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button text="过渡效果"></v-button>
        <v-transition name="fade" time="2">
          <div v-show="transition_status" style="
          width: .5rem;
          height: .5rem;
          background-color: green;
          ">
          </div>
        </v-transition>
      </div>

      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <v-button text="动画效果" ref="btn_animation"></v-button>
        <v-transition enter="bounceIn" leave="bounceOut" >
          <div v-show="animation_status" style="
          width: .5rem;
          height: .5rem;
          background-color: green;
          ">
          </div>
        </v-transition>
      </div>
    </v-panel> -->

    <v-actions ref="actions" v-model="actions_value" :items="actions_items"></v-actions>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">Panel Header</div>
        <div class="c-panel-extra">
          <span class='icon icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="c-panel-title">模式设置
          <div class="c-panel-introduce">介绍介绍介绍介绍</div>
        </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>


    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">定时设置</div>
        <a href="/timer">
          <v-button text="jump"></v-button>
        </a>
      </div>
    </v-panel>

     <!---->
    <v-panel>
      <div slot="body" class="c-panel-body">
        <v-input ref="input" v-model="message" placeholder="未输入时提示内容"></v-input>

      </div>
    </v-panel>

    <div class="c-panel">
      <v-slide v-model="slide_value">
        <div slot="item">
          <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item1</div>
        </div>
        <div slot="item">
          <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item2</div>
        </div>
        <div slot="item">
          <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item3</div>
        </div>
        <div slot="item">
          <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item4</div>
        </div>
        <div slot="item">
          <div style="height: 100px; display: flex; justify-content: center; align-items: center;">item5</div>
        </div>
      </v-slide>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'app',

    data() {
      return {
        countNumber: 5,
        grid_active_id: 2,
        grid_data_2: [{
          text: '修改Wifi密码',
          icon: 'mode-holiday',
          id: 1,
        }, {
          text: '黑名单管理',
          icon: 'mode-freeze',
          id: 2,
        }, {
          text: '修改Wifi密码',
          icon: 'mode-holiday',
          id: 3,
        }, {
          text: '黑名单管理',
          icon: 'mode-freeze',
          id: 4,
        }],

        grid_data_3: [{
          text: '标准加热',
          icon: 'mode-holiday',
          id: 1,
        }, {
          text: '半胆加热',
          icon: 'mode-freeze',
          id: 2,
        }, {
          text: '正胆加热',
          icon: 'mode-cool',
          id: 3,
        }, {
          text: '标准加热',
          icon: 'mode-holiday',
          id: 4,
        }, {
          text: '半胆加热',
          icon: 'mode-freeze',
          id: 5,
        }, {
          text: '正胆加热',
          icon: 'mode-cool',
          id: 6,
        }],

        grid_data_4: [{
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
        }, {
          text: '假日模式',
          icon: 'mode-holiday',
          id: 4,
        }, {
          text: '智能模式',
          icon: 'mode-smart',
          id: 5,
        }, {
          text: '速冷模式',
          icon: 'mode-cool',
          id: 6,
        }, {
          text: '速冻模式',
          icon: 'mode-freeze',
          id: 7,
        }, {
          text: '假日模式',
          icon: 'mode-holiday',
          id: 8,
        }],

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

        dayspicker_list: [6, 7],

        range_data: {
          value: 100,
          min: 0,
          max: 1000,
          tooltip(val) {
            return `${val}°C`;
          },
          dots: [
            {
              icon: 'mode-holiday',
              text: '啊啊',
            },
            {
              icon: 'mode-freeze',
              text: '高温',
            },
          ],
        },
        pickerModal: false,

        range_data_number: {
          value: 500,
          min: 0,
          max: 1000,
          tooltip(val) {
            return `当前温度：${val}°C`;
          },
          dots: [
            {
              text: '低温',
            },
            {
              text: '高温',
            },
          ],
        },
        range_data_json: {
          value: {
            value: 30,
            text: '高档',
          },
          isStep: true,
          dots: [
            {
              value: 10,
              text: '低档',
            },
            {
              value: 20,
              text: '中档',
            },
            {
              value: 30,
              text: '高档',
            },
          ],
        },
        switch_state: true,
        switch_dis_state: false,

        power_state: true,
        dialogOptions: {
          title: '热水器报警',
          description: '热水器过热',
          isModal: true,
          buttons: [
            {
              text: '查看详情',
              /*callback() {
                console.log('传递方法调用');
                console.log(this);
              },*/
            },
            {
              text: '我知道了',
              /*callback() {
                console.log('传递方法调用');
              },*/
            },
          ],
        },

        showDialog: false,

        picker_value: [],
        picker_unit: ['小时后', '分', '秒'],
        picker_items: [{
          values: ['啊ws666', '掰', '猜', '呆'],
          active: 1,
          // displayValues: ['la', 'da', 'fa'],

        },
        {
          values: ['啊', '掰', '猜', '呆'],
          active: 1,
          // displayValues: ['la', 'da', 'fa'],

        },

        ],
        picker_display: 'modal',

        message: '',

        actions_value: false,
        actions_items: [{
          text: '编辑',
        }, {
          text: '删除',
          color: 'red',
        }],
        head_direction: '666666666666666',
        transition_status: true,

        animation_status: true,

        slide_value: 0,
      };
    },

    methods: {
      btnSwitchHandle(state) {
        console.log(`开关按钮状态：${state}`);
      },

      btnClickHandle() {
        console.log('触发按钮点击事件');
      },

      exclusiveChangeHandle(index) {
        console.log(`第${index}个按钮被激活`);
      },

      pickerHandle(val) {
        // console.log(val);
        this.picker_value = val;
      },
    },

    mounted() {
      this.$refs.dayspicker.$on('change', (value) => {
        console.log(`当前的星期选择是: ${value}`);
      });

      this.$refs.rangeNumber.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.range.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.rangeJson.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value.text}`);
      });

      this.$refs.switch.$on('change', (state) => {
        console.log(`设备当前switch状态: ${state}`);

      });

      this.$refs.power.$on('change', (state) => {
        this.power_state = !this.power_state;
        console.log(`设备当前power状态: ${state}`);
      });

      this.$refs.counter.$on('increase', (val) => {
        console.log(`触发increase事件 当前值为：${val}`);
      });

      this.$refs.counter.$on('decrease', (val) => {
        console.log(`触发decrease事件 当前值为：${val}`);
      });

      this.$refs.modes.$on('change', (state) => {
        console.log(`设备当前所选模式id: ${state}`);
      });
      this.$refs.dialog.$on('primaryClick', () => {
        console.log('触发primaryClick事件');
        this.showDialog = false;

      });
      this.$refs.dialog.$on('defaultClick', () => {
        console.log('触发primaryClick事件');
        this.showDialog = false;
      });
      this.$refs.dialog.$on('maskClick', () => {
        console.log('maskClick');
        this.showDialog = false;
      });
      this.$refs.switch_dialog.$on('change', (state) => {
        console.log(`设备当前switch状态: ${state}`);
        // this.showDialog = true;
        this.pickerModal = true;
      });

      this.$refs.btn_actions.$on('change', () => {
        this.actions_value = true;
      });

      this.$refs.actions.$on('change', val => {
        if (val === -1) {
          console.log('取消按钮被点击');
        } else {
          console.log(`第${val + 1}个按钮被点击`);
        }
      });

      // this.$refs.btn_transition.$on('change', () => {
      //   this.transition_status = !this.transition_status;
      // });
      //
      // this.$refs.btn_animation.$on('change', () => {
      //   this.animation_status = !this.animation_status;
      // });

      this.$refs.picker.$on('select', (val) => {
        this.pickerModal = false;
      });
    },
  };
</script>

<style>

  @import './styles/normalize.css';
  @import './styles/default-theme/variables.css';
  @import './styles/mixins.css';
  @import './styles/utils.css';

  /*@import './styles/iconfont.css';*/

  body {
    font-size: $font-size-base;
    background-color: #efefef;
  }
  a {
    text-decoration: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
  }


  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .temperature-number{
    font-size: $font-size-32;
    color: $c-primary;
  }

  /* 废弃代码, 后期可以删除*/
  /*
  .o-panel {
    height: calc($grid-size * 2);

    padding-left: 0.12rem;
    padding-right: 0.12rem;

    font-size: $font-size-lg;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: #fff;

    width: 3.12rem;
    margin: auto;
    box-sizing: border-box;
    border: 1px solid $eee;
    border-radius: 3px;

    &:not(:first-child) {
      margin-top: 10px;
    }

    &.o-panel-lg {
      height: calc($grid-size * 3);
    }
  }
  */


</style>
