<template lang="html">
  <div id="app">
    <v-button text="mainpage" @change="jumpMainpage"></v-button>

    <v-timer :key="key" :options="options" ref="timer" @change="timerChange" @delete="timerDelete">

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

    <v-button
    style="
    margin: 20px auto;
    "
    text="update"
    @change="update"
    ></v-button>

    <v-button
    style="
    margin: 20px auto;
    "
    text="get value"
    @change="getValue"
    ></v-button>

    <div>
      {{ value }}
    </div>

    <v-button
    ref="animate"
    text="animate"
    style="
      margin: 20px auto;
    "
    ></v-button>

    <v-transition name="fade">
      <v-button
      text="动画"
      type="toggle"
      style="
      margin: 20px auto;
      "
      :init_status="true"
      v-show="btn_show">
      </v-button>
    </v-transition>

  </div>
</template>

<script>
import units from '../units/default';

export default {
  name: 'v-app',

  data() {
    return {
      options: {
        // 定义主页内容
        mainpage: {
          task_name: '插座定时', // 定时任务名称
          task_time_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
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

    this.$refs.animate.$on('change', () => {

      this.btn_show = !this.btn_show;
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
          task_name: '插座定时aa', // 定时任务名称
          task_time_express: '3_1_*_*_5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
          pmg_setting: '1', // 执行结果通知。-1不通知，0仅失败通知，1均通知。
          show_delete: true, // 非必需，是否显示删除按钮，默认false，不显示,
          simple: { // 开启简单命令模式界面，会忽略复杂任务页
            title: '定时任务aa', // 开关面板标题
            status: true, // 开关状态
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

<style lang="css">
@import '../styles/normalize.css';
@import '../styles/default-theme/variables.css';
@import '../styles/mixins.css';
@import '../styles/utils.css';


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

</style>
