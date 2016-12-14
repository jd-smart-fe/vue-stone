<template>
  <div id="app">

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">range - noStep : value is a Number</div>
      <div slot="body" class="c-panel-body row-4 u-cross-center">
        <v-range slot="main" ref="rangeNumber"
          v-model="range_data_number.value"
          :min="range_data_number.min"
          :max="range_data_number.max"
          :unit="range_data_number.unit"
          :isStep="range_data_number.isStep"
          :dots="range_data_number.dots"
        >
        </v-range>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">range - isStep : value is an Array</div>
      <div slot="body" class="c-panel-body row-4 u-cross-center">
        <v-range slot="main" ref="rangeArray"
          v-model="range_data_array.value"
          :unit="range_data_array.unit"
          :isStep="range_data_array.isStep"
          :dots="range_data_array.dots"
        >
        </v-range>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header row-1 u-cross-center">range - isStep : value is a JSON object</div>
      <div slot="body" class="c-panel-body row-4 u-cross-center">
        <v-range slot="main" ref="rangeJson"
          v-model="range_data_json.value"
          :unit="range_data_json.unit"
          :isStep="range_data_json.isStep"
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
        <v-power slot="main" ref="power" v-model="power_state"></v-power>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">counter:
          <div class="">
            {{ countNumber }}
          </div>
        </div>
        <v-counter slot="main" ref="counter" :max="10" :min="0" :step="2" v-model=" countNumber "></v-counter>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-disabled: </div>
        <v-button slot="main" @change="btnClickHandle" ref="button" size="lg" text="左风向" icon="mode-holiday" :disabled="true"></v-button>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-click: </div>
        <v-button slot="main" @change="btnClickHandle" size="lg" icon="mode-holiday"></v-button>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">btn-toggle: </div>
        <v-button slot="main" ref="btnSwitch" size="lg" text="开关"  v-model="power_state" icon="mode-holiday" @change="btnSwitchHandle" type="toggle" :initStatus="false"></v-button>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">互斥按钮组</div>
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-button-group :items="buttonGroup" @change="exclusiveChangeHandle">
        </v-button-group>
      </div>
    </v-panel>

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
    <v-modal ref="modal">

    </v-modal>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        countNumber: 10,
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

        buttonGroup: [
          {
            text: '第一个',
          },
          {
            text: '第二个',
            initStatus: true,
          },
          {
            text: '第三个',
          },
          {
            text: '第4个',
          },
          {
            text: '第5个',
          },
        ],

        range_data_number: {
          value: 100,
          min: 0,
          max: 1000,
          unit: '°C',
          dots: ['低温', '高温'],
        },

        range_data_array: {
          value: '2档',
          isStep: true,
          dots: ['1档', '2档', '3档', '4档'],
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
        power_state: false,
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
        console.log(`第${index + 1}个按钮被激活`);
      },
    },

    mounted() {
      this.$refs.rangeArray.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.rangeJson.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value.text}`);
      });

      this.$refs.rangeNumber.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.switch.$on('change', (state) => {
        console.log(`设备当前switch状态: ${state}`);
      });

      this.$refs.power.$on('change', (state) => {
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
      this.$refs.modal.$on('leftBtn', () => {
        console.log('触发leftBtn事件');
      });
      this.$refs.modal.$on('rightBtn', () => {
        console.log('触发rightBtn事件');
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

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    margin-bottom: 60px;
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
