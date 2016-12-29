<template lang="html">
  <div id="app">
    <v-button text="mainpage" @change="jumpMainpage"></v-button>
    <v-timer :options="options" ref="timer" @change="timerChange" @delete="timerDelete">


      <v-panel slot="simple" class="c-panel">
        <div slot="header" class="c-panel-header row-1 u-cross-center">我是标题</div>
        <div slot="body" class="c-panel-body row-1 u-cross-center">
          <div>开关</div>
          <div>
            <v-button text="开关" type="toggle"></v-button>
          </div>
        </div>
      </v-panel>


    </v-timer>

    <v-button
    style="
    margin: 20px auto;
    "
    text="get value"
    @change="getValue"
    ></v-button>

    <div>
      {{ value }}
    </div>
  </div>
</template>

<script>

const options = {
  // 定义主页内容
  mainpage: {
    task_name: '插座定时开关',
    time_task_express: '31_16_*_*_4,5_*', // 如果是新建任务，可以不传入该参数，或者传入false。
    pmg_setting: -1,
    show_delete: true, //非必需，是否显示删除按钮，默认false，不显示,
  },

  // 定义多任务页内容
  taskpage: [{ // 注意：组件先后顺序会体现在页面上
    name: 'onOff', // 如果需要开关，必须写在第一位
    title: '自定义开关名称',
    value: 0,
  }, {
    name: 'modes', // 对应模板组件名称，目前支持仅支持'onOff', 'modes', 'range', 'counter'
    title: '自定义名称', // 任务面板的标题
    value: 1,   // 其余参数均按照正常组件参数传入
    items: [{
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
    }],
  }, {
    name: 'range',
    title: '风速设置',
    value: 100,
    min: 0,
    max: 1000,
    tooltip(val) {
      return `${val}°C`;
    },
    dots: [{
      icon: 'mode-holiday',
      text: '啊啊',
    }, {
      icon: 'mode-freeze',
      text: '高温',
    }],
  }, {
    name: 'counter',
    title: '脱水次数',
    value: 5,
    max: 10,
    min: 0,
    step: 1,
  }],
};

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
          text: 'a定时关闭',
          id: 1,
        }, {
          text: 'a定时开启',
          id: 2,
        }],
      },

      value: '',
    };
  },

  mounted() {
    this.$refs.timer.$on('jump', val => {
      this.$refs.timer.jump(val);
    });
  },

  methods: {
    timerChange() {
    },

    timerDelete() {
      console.log('确定删除');
    },

    getValue() {
      this.value = this.$refs.timer.getValue();
    },

    jumpMainpage() {
      this.$refs.timer.jump('main');
    },
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
