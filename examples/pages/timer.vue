<template>
  <div>

    <div class="page-header row-2 u-cross-center">
      <div class="page-header-left u-cross-center row-2">
        <router-link to="/" class="back-link">
          <span class="icon icon-pull-left page-header-icon"></span>返回
        </router-link>
      </div>
    </div>

    <v-timer :key="key" :options="options" ref="timer" @change="timerChange" @delete="timerDelete">

      <v-panel slot="simple" class="c-panel">
        <div slot="header" class="c-panel-header row-1 u-cross-center">我是标题</div>
        <div slot="body" class="c-panel-body row-1 u-cross-center">
          <div>开关</div>
          <div>
            <v-button type="toggle" radius="circle">开关</v-button>
          </div>
        </div>
      </v-panel>

    </v-timer>

    <div class="clearfix timer-buttons">
      <v-button @change="jumpMainpage">
        mainpage
      </v-button>
      <v-button @change="update">
        update
      </v-button>
      <v-button @change="getValue">
        get value
      </v-button>
    </div>

    <div class="timer-value">
      {{ value }}
    </div>

  </div>
</template>

<script>
import units from 'src/units/default';

export default {
  name: 'v-app',

  data() {
    return {
      options: {
        // 定义主页内容
        mainpage: {
          task_name: '插座定时', // 定时任务名称
          // task_time_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
          task_time_express: false, // 如果是新建任务，可以不传入该参数，或者传入false。
          pmg_setting: '1', // 执行结果通知。-1不通知，0仅失败通知，1均通知。
          show_delete: false, // 非必需，是否显示删除按钮，默认false，不显示,
          simple: { // 开启简单命令模式界面，会忽略复杂任务页
            title: '定时任务', // 开关面板标题
            status: false, // 开关状态
            // hideDefault: false, // 是否隐藏默认的开关，主要用于想插入自定义组件，又不想要默认的开关组件
          },
        },
      },
      key: 1,
      simple: {
        grid_active_id: 1,
        grid_data_2: [{
          text: 'a定时关闭',
          id: 1,
        }, {
          text: 'a定时开启',
          id: 2,
        }],
      },

      value: '',

      btn_show: true,

      picker_items: [{
        values: [1, 2, 3],
        active: 1,
        displayValues: ['la', 'da', 'fa'],
      }, {
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        active: 2,
        // displayValues: ,
      }],

      picker_value: [],

      timepicker_min: undefined,
      timepicker_hour: undefined,
    };
  },

  mounted() {
    this.$refs.timer.$on('jump', val => {
      this.$refs.timer.jump(val);
    });
  },

  methods: {
    timerChange() {
    },

    timerDelete() {
      console.log('确定删除');
    },

    getValue() {

      this.value = this.$refs.timer.getValue();
    },

    update() {
      this.options = {
        // 定义主页内容
        mainpage: {
          task_name: '插座定时', // 定时任务名称
          // task_time_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
          task_time_express: false, // 如果是新建任务，可以不传入该参数，或者传入false。
          pmg_setting: '1', // 执行结果通知。-1不通知，0仅失败通知，1均通知。
          show_delete: false, // 非必需，是否显示删除按钮，默认false，不显示,
          simple: { // 开启简单命令模式界面，会忽略复杂任务页
            title: '定时任务', // 开关面板标题
            status: false, // 开关状态
            // hideDefault: false, // 是否隐藏默认的开关，主要用于想插入自定义组件，又不想要默认的开关组件
          },
        },
      };
    },

    jumpMainpage() {
      this.$refs.timer.jump('main');
    },

    units() {
      return units;
    },

    key22() {
      this.key += 1;
    },
  },
};
</script>

<style>
  .timer-value {
    font-size: 16px;
  }
  .timer-buttons {
    .c-btn {
      float: left;
      margin: 20px 0;
    }
  }
</style>
