<template lang="html">
  <div class="c-timer">
    <v-panel>
      <div slot="body">
        <v-picker :initHour="_time.hour" :initMin="_time.min"></v-picker>
      </div>
    </v-panel>

    <v-panel>
      <a slot="body" class="c-panel-body row-1 u-cross-center" :href="`${path}/repeat`">
        <div>重复</div>
        <div class="c-timer-content">
          {{ this._repeat }} <span>></span>
        </div>
      </a>
    </v-panel>

    <template v-if="options.commend.simple !== false">
      <slot name="simple" v-if=""></slot>
    </template>

    <template v-else>
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" :href="`${path}/task`">
          <div>执行命令</div>
          <div class="c-timer-content">
            {{ this._commend }} <span>></span>
          </div>
        </a>
      </v-panel>
    </template>

    <v-panel>
      <a slot="body" class="c-panel-body row-1 u-cross-center">
        <div>定时名称</div>
        <div class="c-timer-content">
          {{ options.task_name }} <span>></span>
        </div>
      </a>
    </v-panel>

    <v-panel>
      <a slot="body" class="c-panel-body row-1 u-cross-center">
        <div>执行结果通知</div>
        <div class="c-timer-content">
          {{ this._notice }} <span>></span>
        </div>
      </a>
    </v-panel>

    <div class="c-panel">
      <div class="c-panel-body row-1 c-timer-center u-cross-center">
        删除定时
      </div>
    </div>
  </div>
</template>

<script>
// const options = {
//   task_name: '插座定时开关', // task_name:定时任务名称
//   time_task_express: '1_22_26_2_*_2015', // 格式见微联文档
//   pmg_setting: 0, // -1表不通知，0表仅执行失败通知，1表均通知
// };
const path = window.location.href;

export default {
  name: 'v-timer',

  data() {
    return {
      path,
    };
  },

  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  computed: {
    _repeat() {
      const text = [];
      const arr = this.options.time_task_express.split('_');

      // 执行一次
      if (arr[5] !== '*') {
        return '执行一次';
      }

      if (arr[4] === '*' && arr[3] === '*' && arr[2] === '*') {
        return '每天';
      }

      const week = arr[4].split(',');

      week.forEach((val) => {
        switch (val) {
          case '0':
            text.push('周日');
            break;
          case '1':
            text.push('周一');
            break;
          case '2':
            text.push('周二');
            break;
          case '3':
            text.push('周三');
            break;
          case '4':
            text.push('周四');
            break;
          case '5':
            text.push('周五');
            break;
          case '6':
            text.push('周六');
            break;
          default:
        }
      });

      if (text.join(',') === '周日,周六') {
        return '周末';
      }

      if (text.join(',') === '周一,周二,周三,周四,周五') {
        return '工作日';
      }

      return text.join('、');
    },

    _notice() {
      const n = this.options.pmg_setting;

      switch (n) {
        case -1:
          return '不通知';
        case 0:
          return '仅失败时通知';
        case 1:
          return '均通知';
        default:
          return '参数错误';
      }
    },

    _time() {
      const arr = this.options.time_task_express.split('_');
      const min = arr[0] * 1;
      const hour = arr[1] * 1;

      return { min, hour };
    },

    _commend() {
      if (!this.options.commend.text) {
        return '';
      }

      return this.options.commend.text.join('/');
      // 检测是否含有开关
      // const hasNoSwitch = list.every((val, index)) => {
      //   return val.name !== 'switch';
      // });
      // if (hasNoSwitch) {
      //   cmd.push
      // }
      //
      //
      // list.forEach(val => {
      //   if (val.name === 'switch') {
      //
      //   }
      //   //
      //   // if (val.name === 'mode') {
      //   //   if ()
      //   // }
      // });
    },
  },
};
</script>

<style lang="css">
  @import '../styles/default-theme/variables.css';

  .c-timer{
    a{
      text-decoration: none;
      color: #2c3e50;
      user-select: none;

      -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    }

    .c-timer-content{
      color: $gray-light;
    }
    .c-timer-center{
      justify-content: center;
    }
  }
</style>
