<template lang="html">
  <div class="c-timer">

    <!-- 首屏  -->
    <div v-show="currentPage === 'index'">
      <!-- 时间选择 -->
      <v-panel>
        <div slot="body">
          <v-picker @change='pickerHandle' :initHour="_initTime.hour" :initMin="_initTime.min"></v-picker>
        </div>
      </v-panel>

      <!-- 重复 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('repeat')">
          <div>重复</div>
          <div class="c-timer-content">
            {{ this._repeat }} <span>></span>
          </div>
        </a>
      </v-panel>

      <!-- simple task 模式 -->
      <!-- 暨只在首页有开关选项 -->
      <template v-if="options.mainpage.simple">
        <template v-if="!options.mainpage.simple.hideDefault">

          <v-panel>
            <div slot="header" class="c-panel-header row-1 u-cross-center">
              {{ options.mainpage.simple.title }}
            </div>
            <div slot="body" class="c-panel-body u-without-padding">
              <v-modes v-model="mainpageSwtich.active_id"
              :numberal="2" :items="mainpageSwtich.data_2"
              ></v-modes>
            </div>
          </v-panel>

        </template>
        <slot name="simple"></slot>
      </template>

      <!-- 复杂任务模式 点击加载任务页 -->
      <template v-else>
        <v-panel>
          <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('task')" >
            <div>执行命令</div>
            <div class="c-timer-content">
              {{ this._tasks }} <span>></span>
            </div>
          </a>
        </v-panel>
      </template>

      <!-- 定时名称 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('name')">
          <div>定时名称</div>
          <div class="c-timer-content">
            {{ task_name }} <span>></span>
          </div>
        </a>
      </v-panel>

      <!-- 执行结果通知 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('notice')">
          <div>执行结果通知</div>
          <div class="c-timer-content">
            {{ this._notice }} <span>></span>
          </div>
        </a>
      </v-panel>

      <!-- 删除定时 -->
      <div class="c-panel">
        <div class="c-panel-body row-1 c-timer-center u-cross-center">
          删除定时
        </div>
      </div>
    </div>

    <!-- 新页面： 选择重复日期 -->
    <div v-show="currentPage === 'repeat'">
      <v-panel>
        <div slot="body" class="c-panel-body row-1 u-cross-center">
          <div class="">
            重复
          </div>
          <div class="">
            <v-switch v-model="repeat_switch"></v-switch>
          </div>
        </div>
        <div v-show="repeat_switch" slot="body" class="c-panel-body row-5 u-without-padding c-timer-border-top">
          <v-dayspicker ref="dayspicker" :days="days" @change="dayspickerHandle">
          </v-dayspicker>
        </div>
      </v-panel>
    </div>

    <!-- 新页面： 多任务命令 -->
    <!-- 因为进入mainpage就立刻需要taskpage提供的数据，所以用了v-show没有用v-if -->
    <template v-if="!options.mainpage.simple">
      <div v-show="currentPage === 'task'">
        <v-timer-task ref="task" :options="options.taskpage" @change="taskHandle">
          <!-- 自定义内容 -->
          <slot name="task"></slot>
        </v-timer-task>
      </div>
    </template>


    <!-- 新页面：定时名称 -->
    <div v-show="currentPage === 'name'">
      <v-panel>
        <div slot="body" class="c-panel-body row-5 u-cross-center">
          <input type="text"
          style="
          width: 100%;
          height: 50px;
          border: 1px solid #999;
          "
          v-model="task_name"
          >
        </div>
      </v-panel>
    </div>

    <!-- 新页面： 执行结果通知 -->
    <div v-show="currentPage === 'notice'">
      <v-panel>
        <div slot="body" class="c-panel-body u-without-padding u-border m-border">
          <v-checkboard :items="checkboardItems" v-model="notice"></v-checkboard>
        </div>
      </v-panel>
    </div>

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
      currentPage: 'index',
      task_name: this.options.mainpage.task_name, // 定时名称
      days: [], // 储存重复日期,
      tasksValue: [], // taskspage提供的新数据
      notice: this.options.mainpage.pmg_setting, // pmg_setting值
      time: this._initTime, //

      mainpageSwtich: {
        active_id: 1,
        data_2: [{
          text: '定时关闭',
          id: 0,
        }, {
          text: '定时开启',
          id: 1,
        }],
      },

      checkboardItems: [{
        text: '不通知',
        id: -1,
      }, {
        text: '仅失败时通知',
        id: 0,
      }, {
        text: '均通知',
        id: 1,
      }],

      repeat_switch: this.options.repeatpage.length === 1,
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
      if (this.days.length === 1) {
        this.repeat_switch = false;
        return '执行一次';
      }

      if (!this.repeat_switch) {
        return '执行一次';
      }

      const str = units.weekArrToStr(this.days);
      return str;
    },

    _notice() {
      const n = this.notice;

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

    _initTime() {
      let time = {};
      if (!this.options.mainpage.time_task_express) {

        const date = {
          min: (new Date().getMinutes()),
          hour: (new Date().getHours()),
        };
        time = {
          min: date.min,
          hour: date.hour,
        };
      } else {

        const arr = this.options.mainpage.time_task_express.split('_');
        time = {
          min: arr[0] * 1,
          hour: arr[1] * 1,
        };
      }

      return time;
    },

    _tasks() {
      // 解析options
      // const arr = [];
      // if (this.taskpage[0].name === 'onOff') {
      //   if (this.taskpage[0].value === 0) {
      //     return '定时关闭';
      //   }
      //   arr.push('定时开启');
      // }
      //
      // this.taskpage.forEach(val => {
      //   // 模式选择
      //   if (val.name === 'modes') {
      //     const selected = val.items.find(v => v.id === val.value);
      //     arr.push(selected.text);
      //   }
      //
      //   // rang
      //   if (val.name === 'range') {
      //     console.log(this);
      //   }
      // });
      // return arr.join('/');

      // 解析tasksValue;
      if (this.tasksValue.length === 0) return '';
      let arr = [];

      // onOff
      if (this.tasksValue[0].name === 'onOff' && !this.tasksValue[0].value) {
        return '定时关闭';
      }

      // tasks
      arr = this.tasksValue.map(val => val.text);

      return arr.join('/');
    },
  },

  created() {

    // 根据传入参数初始化星期
    // 如果是新建定时任务
    if (!this.options.mainpage.time_task_express) {
      const week = [(new Date()).getDay()];
      this.days = week === [0] ? [7] : week;
      return;
    }
    // 如果是读取已有定时任务
    const week = units.arrayTimeTaskExpress(this.options.mainpage.time_task_express);
    this.days = week;
    // Array.prototype.push.apply(this.days, week);
  },

  mounted() {
    // console.log(this.$refs.task.getValue());
  },

  methods: {
    getValue() {
      let repeat;
      if (this.repeat_switch) {
        repeat = this.days;
      } else {
        repeat = false;
      }

      const value = {
        repeat,
        time: {
          hour: this.time.hour,
          min: this.time.min,
        },
        notice: this.notice,
        task_name: this.task_name,
      };

      if (this.options.mainpage.simple) {
        Object.assign(value, {
          simple_switch: this.mainpageSwtich.active_id === 1,
        });
      }

      if (this.tasksValue.length > 0) {
        Object.assign(value, {
          tasksList: this.tasksValue,
        });
      }

      return value;
    },

    emitValues() {
      const val = this.getValue();

      this.$emit('change', val);
    },

    jumpHandle(val) {
      if (this._repeat === '执行一次') {
        this.repeat_switch = false;
      }

      this.currentPage = val;
    },

    backHandle() {
      this.currentPage = 'index';
    },

    dayspickerHandle(val) {
      this.days = val;
    },

    pickerHandle(val) {
      this.time = val;
    },

    taskHandle(val) {
      this.tasksValue = val;
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

    .c-timer-border-top{
      border-top: 1px solid #e5e5e5;
    }

    .c-dayspicker-quick{
      padding: 0.12rem;
    }

    .c-dayspicker-body{
      padding: 0 0.12rem;
    }
  }

  .m-border{
    border: 1px solid $gray-lighter
  }
</style>
