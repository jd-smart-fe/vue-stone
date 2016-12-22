<template lang="html">
  <div class="">

    <v-panel v-if="hasSwitch">
      <div slot="header" class="c-panel-header row-1 u-cross-center">开关</div>
      <div slot="body" class="c-panel-body u-without-padding">
        <v-modes v-model="switchStatus"
          :numberal="2" :items="switchData"
        ></v-modes>
      </div>
    </v-panel>

    <div v-show="_showTask" class="c-task-setting">
      <template lang="html">

      </template>
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'v-timer-task',

  data() {
    return {
      hasSwitch: false,

      switchData: [{
        text: '定时关闭',
        id: 1,
      }, {
        text: '定时开启',
        id: 2,
      }],

      switchStatus: 1,
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
      if (typeof this.options.onOff === 'boolean') {
        return this.switchStatus === 2;
      }
      return true;
    },
  },

  created() {
    // 判断是否有开关按钮
    if (typeof this.options.onOff === 'boolean') {
      this.hasSwitch = true;
    }
    // 初始化switchStatus
    this.switchStatus = this.options.onOff
    ? 2
    : 1;

  },

  methods: {
    getValues() {
      const value = [];
      // 添加开关属性
      if (this.hasSwitch) {
        value.push({ onOff: this.options.onOff });
      }
      return value;
    },
  },
};
</script>

<style lang="css">
  .c-task-setting{
    margin-top: 10px;
  }
</style>
