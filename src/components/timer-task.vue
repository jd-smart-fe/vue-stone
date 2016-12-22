<template lang="html">
  <div class="">

    <v-panel v-if="options.hasSwitch">
      <div slot="header" class="c-panel-header row-1 u-cross-center">开关</div>
      <div slot="body" class="c-panel-body u-without-padding">
        <v-modes v-model="oswitch.grid_active_id" ref="modes"
          :numberal="2" :items="oswitch.grid_data_2"
        ></v-modes>
      </div>
    </v-panel>

    <div v-show="_showTask" class="c-task-setting">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'v-timer-task',

  data() {
    return {
      oswitch: {
        grid_active_id: 1,
        grid_data_2: [{
          text: '定时关闭',
          id: 1,
        }, {
          text: '定时开启',
          id: 2,
        }],
      },
    };
  },

  props: {
    options: {
      type: Object,
      required: true,
      default: {},
    },
  },

  computed: {
    _showTask() {
      if (this.options.hasSwitch) {
        return this.oswitch.grid_active_id === 2;
      }
      return true;
    },
  },
};
</script>

<style lang="css">
  .c-task-setting{
    margin-top: 10px;
  }
</style>
