<template lang="html">
  <div class="c-timer">

    <!-- 首屏  -->
    <template v-if="currentPage === 'index'">
      <v-panel>
        <div slot="body">
          <v-picker :initHour="_time.hour" :initMin="_time.min"></v-picker>
        </div>
      </v-panel>

      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpRepeatHandle">
          <div>重复</div>
          <div class="c-timer-content">
            {{ this._repeat }} <span>></span>
          </div>
        </a>
      </v-panel>

      <template v-if="options.simple">
        <slot name="simple"></slot>
      </template>

      <template v-else>
        <v-panel>
          <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpTaskHandle" >
            <div>执行命令</div>
            <div class="c-timer-content">
              {{ this._tasks }} <span>></span>
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
    </template>

    <!-- 选择时间 -->
    <template v-if="currentPage === 'repeat'">
      <v-panel>
        <div slot="body" class="c-panel-body row-5 u-cross-center">
          <v-dayspicker ref="dayspicker" :value="days" @change="dayspickerHandle">
          </v-dayspicker>
        </div>
      </v-panel>
    </template>

    <!-- 任务命令 -->
    <template v-if="currentPage === 'task'">
      <v-timer-task :options="options">
        <slot name="task"></slot>
      </v-timer-task>
    </template>

    <v-button style="
      position: absolute;
      top: 10px;
    "
    text="index" @change="backHandle"></v-button>

  </div>
</template>

<script>
import units from '../units/default';

export default {
  name: 'v-timer',

  data() {
    return {
      rootpath: `${window.location.origin}${this.pathname}`,
      // currentPathname: window.location.pathname,
      currentPage: 'index',
      days: [],
    };
  },

  props: {
    options: {
      type: Object,
      required: true,
    },

    pathname: {
      type: String,
      required: false,
      default: '/timer',
    },

    tasks: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },

  computed: {
    _repeat() {
      if (this.days.length === 1) {
        return '执行一次';
      }
      const str = units.weekArrToStr(this.days);
      return str;
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

    _tasks() {
      if (!this.tasks.text) {
        return '';
      }

      return this.tasks.text.join('/');
    },
  },

  created() {
    // 根据传入参数初始化星期
    const week = units.arrayTimeTaskExpress(this.options.time_task_express);
    this.days = week;
    // Array.prototype.push.apply(this.days, week);
  },

  methods: {
    jumpRepeatHandle() {
      this.currentPage = 'repeat';
    },
    jumpTaskHandle() {
      this.currentPage = 'task';
    },
    backHandle() {
      this.currentPage = 'index';
    },
    dayspickerHandle(val) {
      console.log(val);
      this.days = val;
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
