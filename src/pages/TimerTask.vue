<template lang="html">
  <div id="app">
    <v-timer-task :options="options">

      <v-panel>
        <div slot="header" class="c-panel-header row-1 u-cross-center">
          模式设置
        </div>
        <div slot="body" class="c-panel-body u-without-padding">
          <v-modes v-model="modes.grid_active_id" ref="modes"
            :numberal="4" :items="modes.grid_data_2"
          ></v-modes>
        </div>
      </v-panel>

      <v-panel>
        <div slot="header" class="c-panel-header row-1 u-cross-center">风速设置</div>
        <div slot="body" class="c-panel-body row-3 u-cross-center">
          <v-range slot="main"
          v-model="range.value"
          :is_step="range.isStep"
          :dots="range.dots"
          >
          </v-range>
        </div>
      </v-panel>

      <!-- <v-picker></v-picker> -->

    </v-timer-task>
  </div>
</template>

<script>
const options = {
  hasSwitch: true,
  // switchStatus: true,
};

export default {
  name: 'TimerTask',

  data() {
    return {
      options,

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
  },
};
</script>

<style lang="css">
</style>
