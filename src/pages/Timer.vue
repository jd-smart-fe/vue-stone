<template lang="html">
  <div id="app">
    <v-timer :options="options">

      <template slot="simple">
        <v-panel>
          <div slot="header" class="c-panel-header row-1 u-cross-center">
            定时任务
          </div>
          <div slot="body" class="c-panel-body u-without-padding">
            <v-modes v-model="simple.grid_active_id" ref="modes"
              :numberal="2" :items="simple.grid_data_2"
            ></v-modes>
          </div>
        </v-panel>
      </template>


      <!-- task -->
      <template slot="task">
        <v-panel>
          <div slot="header" class="c-panel-header row-1 u-cross-center">
            模式设置
          </div>
          <div slot="body" class="c-panel-body u-without-padding">
            <v-modes v-model="mods.modes.grid_active_id" ref="modes"
            :numberal="4" :items="mods.modes.grid_data_2"
            ></v-modes>
          </div>
        </v-panel>

        <v-panel>
          <div slot="header" class="c-panel-header row-1 u-cross-center">风速设置</div>
          <div slot="body" class="c-panel-body row-3 u-cross-center">
            <v-range slot="main"
            v-model="mods.range.value"
            :is_step="mods.range.isStep"
            :dots="mods.range.dots"
            >
            </v-range>
          </div>
        </v-panel>
      </template>



    </v-timer>
  </div>
</template>

<script>
import units from '../units/default';

const date = {
  min: (new Date().getMinutes()),
  hour: (new Date().getHours()),
  day: (new Date().getDate()),
  month: (new Date().getMonth()),
  year: (new Date().getFullYear()),
};
const timeTaskExpress = units.timeTaskExpress(date.min,
  date.hour,
  date.day,
  date.month,
  '1,2',
  date.year);

const options = {
  task_name: '插座定时开关', // task_name:定时任务名称
  time_task_express: timeTaskExpress, // 格式见微联文档
  pmg_setting: -1, // -1表不通知，0表仅执行失败通知，1表均通知
  show_delete: true, // 是否显示‘删除定时按钮’
  // simple: false,
};

const tasks = {};

const mods = {
  modes: {
    grid_active_id: 1,
    grid_data_2: [{
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
    }],
  },

  range: {
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
};

export default {
  name: 'v-app',

  data() {
    return {
      options,
      mods,
      simple: {
        grid_active_id: 1,
        grid_data_2: [{
          text: '插座定时关闭',
          id: 1,
        }, {
          text: '插座定时开启',
          id: 2,
        }],
      },
    };
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
