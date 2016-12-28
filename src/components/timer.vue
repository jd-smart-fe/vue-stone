<!--
*****
***** Readme
***** 方法：
***** getValue() 返回当前设置的值
***** setTaskText(text) 将当前执行命令的文本设置成 text。
*****
 -->



<template lang="html">
  <div class="c-timer">

    <!-- 首屏  -->
    <div v-show="currentPage === 'index'">
      <!-- 时间选择 -->
      <v-panel>
        <div slot="body">
          <v-picker @change='pickerHandle' :init_hour="_initTime.hour" :init_min="_initTime.min"></v-picker>
        </div>
      </v-panel>

      <!-- 重复 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('repeat')">

          <div class="title-not-flex">重复</div>
          <div class="c-timer-content control-field">
            {{ this._repeat }}
            <span class="icon icon-pull-right"></span>
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
            <div class="title-not-flex">执行命令</div>
            <div class="c-timer-content control-field">
              {{ this._tasks }} <span>></span>
            <div>执行命令</div>
            <div class="c-timer-content">
              {{ this.taskText }} <span class="icon icon-pull-right"></span>
            </div>
          </a>
        </v-panel>
      </template>

      <!-- 定时名称 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('name')">

          <div class="title-not-flex">定时名称</div>
          <div class="c-timer-content control-field">
            {{ task_name }}
            <span class="icon icon-pull-right"></span>

          </div>
        </a>
      </v-panel>

      <!-- 执行结果通知 -->
      <v-panel>
        <a slot="body" class="c-panel-body row-1 u-cross-center" @click="jumpHandle('notice')">
          <div class="title-not-flex">执行结果通知</div>
          <div class="c-timer-content">
            {{ this._notice }} <span class="icon icon-pull-right"></span>
          </div>
        </a>
      </v-panel>

      <!-- 删除定时 -->
      <div v-if="_showDelect" class="c-panel">
        <div ref="btn_delete" class="c-panel-body row-1 c-timer-center u-cross-center ">
          删除定时
        </div>
      </div>

      <!-- 删除定时 弹窗 -->
      <v-dialog ref="dialog_delete" :showDialog="showDialog" :options="dialogOptions"></v-dialog>
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
    <!-- 关闭简单命令模式 并且 taskpage有传入参数的情况下显示 -->
    <template v-if="!options.mainpage.simple && options.taskpage">
      <div v-show="currentPage === 'task'">
        <v-timer-task ref="task" :options="options.taskpage" @change="taskHandle">
          <!-- 自定义内容 -->
          <slot name="task" @change="slotHandle"></slot>
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
      days: [], // 储存重复日期,
      taskValue: [], // taskpage提供的新数据
      task_name: this.options.mainpage.task_name, // 定时名称
      notice: this.options.mainpage.pmg_setting, // pmg_setting值
      time: this._initTime, // 初始时间
      taskText: this._task, // 执行命令 显示的文本

      showDialog: false, // 弹窗
      dialogOptions: {
        title: '确定删除定时？',
        // description: '热水器过热',
        isModal: true,
        buttons: [
          {
            text: '点错啦',
          },
          {
            text: '确定',
          },
        ],
      },

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

      repeat_switch: this.options.repeatpage
      ? this.options.repeatpage.length > 0
      : false,
    };
  },

  props: {
    options: {
      type: Object,
      required: true,
    },
  },

  watch: {
    _task(val) {
      this.taskText = val;
    },
  },

  computed: {
    _repeat() {
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
      if (!this.options.mainpage.time) {
        const date = {
          min: (new Date().getMinutes()),
          hour: (new Date().getHours()),
        };
        time = {
          min: date.min,
          hour: date.hour,
        };
      } else {
        const hour = this.options.mainpage.time.hour;
        const min = this.options.mainpage.time.min;

        time = {
          hour,
          min,
        };
      }

      return time;
    },

    _task() {
      // 解析taskValue;
      if (this.taskValue.length === 0) return '';
      let arr = [];

      // onOff
      if (this.taskValue[0].name === 'onOff' && !this.taskValue[0].value) {
        return '定时关闭';
      }

      // task
      arr = this.taskValue.map(val => val.text);

      return arr.join('/');
    },

    _showDelect() {
      if (this.options.mainpage.show_delete) return true;
      return false;
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
  },

  mounted() {
    this.$refs.btn_delete.addEventListener('click', () => {
      this.showDialog = true;
    });

    // 取消
    this.$refs.dialog_delete.$on('defaultClick', () => {
      this.showDialog = false;
    });

    // 确定
    this.$refs.dialog_delete.$on('primaryClick', () => {
      this.showDialog = false;
      this.$emit('delete');
    });
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

      if (this.taskValue.length > 0) {
        Object.assign(value, {
          taskList: this.taskValue,
        });
      }

      return value;
    },

    setTaskText(val) {
      this.taskText = val;
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
      this.taskValue = val;
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
