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
    <div v-show="currentPage === 'main'">
      <!-- 时间选择 -->
      <v-panel>
        <div slot="body">
          <v-timepicker
          ref="timepicker"
          :hour="_initTime.hour"
          :min="_initTime.min"
          @change='_pickerHandle'
          :rotate_effect="false"
          ></v-timepicker>
        </div>
      </v-panel>

      <!-- 重复 -->
      <v-panel>

        <a slot="body" class="u-relative c-panel-body row-1 u-cross-center" @click="_emitJump('repeat')">
          <div class="title-not-flex">重复</div>
          <div class="c-timer-content control-field">
            {{ this._repeat }}
            <span class="icon icon-pull-right"></span>
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
              <v-modes v-model="switch_active_id" @change="modeChange"
              :numberal="2" :items="switch_data"
              ></v-modes>
            </div>
          </v-panel>

        </template>

        <slot name="simple"></slot>
      </template>

      <!-- 复杂任务模式 点击加载任务页 -->
      <template v-else>
        <v-panel>
          <a slot="body" class="u-relative c-panel-body row-1 u-cross-center" @click="_emitJump('task')" >
            <div class="title-not-flex">执行命令</div>
            <div class="c-timer-content control-field">
              {{ this.taskText }} <span class="icon icon-pull-right"></span>
            </div>
          </a>
        </v-panel>
      </template>

      <!-- 定时名称 -->
      <v-panel>
        <a slot="body" class="u-relative c-panel-body row-1 u-cross-center" @click="_emitJump('name')">

          <div class="title-not-flex">定时名称</div>
          <div class="c-timer-content control-field">
            {{ task_name }}
            <span class="icon icon-pull-right"></span>

          </div>
        </a>
      </v-panel>

      <!-- 执行结果通知 -->
      <v-panel>
        <a slot="body" class="u-relative c-panel-body row-1 u-cross-center" @click="_emitJump('notice')">
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
      <v-dialog ref="dialog_delete" v-model="showDialog"
        :title="dialogOptions.title"
        :buttons="dialogOptions.buttons"></v-dialog>
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
          <v-dayspicker ref="dayspicker" v-model="days" @change="_dayspickerHandle">
          </v-dayspicker>
        </div>
      </v-panel>
    </div>

    <!-- 新页面： 多任务命令 -->
    <!-- 关闭简单命令模式 并且 taskpage有传入参数的情况下显示 -->
    <template v-if="!options.mainpage.simple && options.taskpage">
      <div v-show="currentPage === 'task'">
        <v-timer-task ref="task" :options="options.taskpage" @change="_taskHandle">
          <!-- 自定义内容 -->
          <slot name="task" @change="slotHandle"></slot>
        </v-timer-task>
      </div>
    </template>


    <!-- 新页面：定时名称 -->
    <div v-show="currentPage === 'name'">
      <v-panel>
        <div slot="body" class="c-panel-body row-1 u-cross-center">
          <v-input class="c-timer-input" v-model="task_name" placeholder="定时名称"></v-input>
        </div>
      </v-panel>
    </div>

    <!-- 新页面： 执行结果通知 -->
    <div v-show="currentPage === 'notice'">
      <v-panel>
        <div slot="body" class="c-panel-body u-without-padding u-border m-border">
          <v-checkboard v-model="notice">
            <div slot="item" data-value="-1">不通知</div>
            <div slot="item" data-value="0">仅失败通知</div>
            <div slot="item" data-value="1">均通知</div>
          </v-checkboard>
        </div>
      </v-panel>
    </div>

  </div>
</template>

<script>
  import units from '../utils/timer';

  export default {
    name: 'v-timer',

    data() {
      return {
        currentPage: 'main',
        days: [], // 储存重复日期,
        taskValue: [], // taskpage提供的新数据
        task_name: this.options.mainpage.task_name, // 定时名称
        notice: this.options.mainpage.pmg_setting * 1, // pmg_setting值
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

        switch_active_id: this.options.mainpage.simple.status ? 1 : 0,
        switch_data: [{
          text: '定时关闭',
          id: 0,
        }, {
          text: '定时开启',
          id: 1,
        }],

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

        repeat_switch: false,
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

      options(val, oldVal) {
        // 时间参数没有发生变化，需要手动调用timepicker的update方法重置picker
        if (val.mainpage.task_time_express === oldVal.mainpage.task_time_express) {
          this.$refs.timepicker.update();
        }

        // dom更新后调用
        this.$nextTick(() => {
          this._created();
          this._mounted();
          this.switch_active_id = this.options.mainpage.simple.status ? 1 : 0;
          this.task_name = this.options.mainpage.task_name;
          this.notice = this.options.mainpage.pmg_setting * 1;
        });
      },
    },

    computed: {
      _repeat() {
        if (!this.repeat_switch || this.days.length === 0) {
          return '执行一次';
        }

        const str = units.weekArrToStr(this.days);
        return str;
      },

      _notice() {
        const n = window.parseInt(this.notice);

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

        // 如果是新建任务``
        if (!this.options.mainpage.task_time_express) {
          time = {
            min: new Date().getMinutes(),
            hour: new Date().getHours(),
          };

        // 如果是已有任务
        } else {

          // 解析时间表达式
          const min = this.options.mainpage.task_time_express.split('_')[0] * 1;
          const hour = this.options.mainpage.task_time_express.split('_')[1] * 1;

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
      this._created(this);
    },

    mounted() {
      this._mounted();
    },

    methods: {
      modeChange(val, obj) {
        console.log(val);
        this.task_name = obj.text;
        // console.log(this.switch_data[val].text);
      },
      // 获取组件数据
      getValue() {
        let taskTimeExpress = '';
        const activeTime = this.time.active;
        // console.log(`${JSON.stringify(this.time)}`);
        // 定时重复的value
        if (this.repeat_switch && this.days.length > 0) {
          // 开启重复的情况

          taskTimeExpress = units.taskTimeExpress(activeTime[1], activeTime[0], '*', '*', this.days);
        } else {

          // 只执行一次的情况
          const nowdate = this.getNowDate();

          // 如果设置时间小于等于现在时间，则任务默认为第二天进行
          // console.log(this.time[0]);
          const time = this.time.active;
          console.log(time);
          if ((time[0] * 60) + time[1]
          <= (nowdate.hour * 60) + nowdate.min) {

            const date = new Date();
            date.setDate(nowdate.date + 1);

            taskTimeExpress = units.taskTimeExpress(time[1], time[0], date.getDate(), date.getMonth() + 1, '*', date.getFullYear());
          } else {

            // 否则任务默认为今天进行
            taskTimeExpress = units.taskTimeExpress(time[1], time[0], nowdate.date, nowdate.month, '*', nowdate.year);
          }
        }
        // console.log(this.time[);
        // 任务时间表达式，结果通知，任务名称
        const value = {
          task_time_express: taskTimeExpress,
          notice: this.notice,
          task_name: this.task_name,
        };

        // 简单开关的value
        if (this.options.mainpage.simple) {
          Object.assign(value, {
            simple_switch: this.switch_active_id === 1,
          });
        }

        // 复杂开关的value
        if (this.taskValue.length > 0) {
          Object.assign(value, {
            taskList: this.taskValue,
          });
        }
        return value;
      },

      update() {
        this.$forceUpdate();
      },

      // 设置任务字符串
      setTaskText(val) {
        this.taskText = val;
      },

      // 获取当前时间
      getNowDate() {
        const date = new Date();
        return {
          hour: date.getHours(),
          min: date.getMinutes(),
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      },

      jump(val) {
        // 只执行一次时关闭重复按钮
        if (this._repeat === '执行一次') {
          this.repeat_switch = false;
        }

        this.currentPage = val;
      },

      _emitJump(val) {
        this.$emit('jump', val);
      },

      _dayspickerHandle(val) {
        this.days = val;
      },

      _pickerHandle(val) {
        this.time = val;
      },

      _taskHandle(val) {
        this.taskValue = val;
      },

      _created() {
        // console.log(JSON.stringify(this.options));

        // 根据传入参数初始化星期
        // 如果是读取已有定时任务
        if (this.options.mainpage.task_time_express) {

          const week = units.arrayTaskTimeExpress(this.options.mainpage.task_time_express);

          // 如果是重复任务
          if (week.length > 0) {
            this.days = week;
            this.repeat_switch = true;

          // 否则是一次性任务
          } else {
            this.repeat_switch = false;
          }

        // 否则为新建任务
        } else {
          this.repeat_switch = false;
        }
      },

      _mounted() {
        if (this.options.mainpage.show_delete) {
          this.$refs.btn_delete.addEventListener('click', () => {
            this.showDialog = true;
          });
        }

        // 取消
        this.$refs.dialog_delete.$on('buttonfirst', () => {
          this.showDialog = false;
        });

        // 确定
        this.$refs.dialog_delete.$on('buttonsecond', () => {
          this.showDialog = false;
          this.$emit('delete');
        });
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
    .u-relative{
      position: relative;

      .c-timer-content{
        padding-right: 12px;
      }

      .icon{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0.06rem;
        margin: auto;
        transform: translate(0, -4%);
      }
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

    .c-timer-input{
      width: 100%;
    }
  }

  .m-border{
    border: 1px solid $gray-lighter
  }
</style>
