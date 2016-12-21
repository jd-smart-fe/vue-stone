<template lang="html">
  <div id="app">

    <v-timer :options="options">

      <!-- <template slot="simple">
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
      </template> -->

    </v-timer>

  </div>
</template>

<script>
import units from '../units/default';

const date = units.date;
const timeTaskExpress = units.timeTaskExpress(date.min, date.hour, date.day, date.month, '*', date.year);

const options = {
  task_name: '插座定时开关', // task_name:定时任务名称
  time_task_express: timeTaskExpress, // 格式见微联文档
  pmg_setting: -1, // -1表不通知，0表仅执行失败通知，1表均通知
  show_delete: true, // 是否显示‘删除定时按钮’
  commend: { // 定时命令相关配置
    simple: false,
  },
};

export default {
  data() {
    return {
      options,

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
