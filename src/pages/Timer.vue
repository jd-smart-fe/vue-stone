<template lang="html">
  <div id="app">
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
  mainpage: {
    task_name: '插座定时开关',
    // time: {    // 默认为现在时间
    //   hour: 12,
    //   min: 0,
    // },
    pmg_setting: -1,
    show_delete: true, // 是否显示删除按钮，默认值 false,
    simple: { // 若想开启复杂任务模式，不传入simple对象即可
      // title: '定时任务',
      // status: false, // 按钮开关状态
      hideDefault: true, // 是否隐藏默认的开关，主要用于想插入自定义组件，又不想要默认的开关组件
    },
  },
  // repeatpage: [1, 2], // 默认为不重复
  taskpage: [{ // 注意：组件先后顺序会体现在页面上
    name: 'onOff', // 如果需要开关，必须写在第一位
    title: '自定义开关名称',
    value: 0,
  }, {
    name: 'modes',
    title: '自定义名称',
    value: 1,
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
    }, {
      text: '假日模式',
      icon: 'mode-holiday',
      id: 4,
    }, {
      text: '智能模式',
      icon: 'mode-smart',
      id: 5,
    }, {
      text: '速冷模式',
      icon: 'mode-cool',
      id: 6,
    }, {
      text: '速冻模式',
      icon: 'mode-freeze',
      id: 7,
    }, {
      text: '假日模式',
      icon: 'mode-holiday',
      id: 8,
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
    name: 'range',
    title: 'aa风速设置',
    value: {
      value: 30,
      text: '高档',
    },
    is_step: true,
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

  methods: {
    timerChange() {
    },

    timerDelete() {
      console.log('确定删除');
    },

    getValue() {
      this.value = this.$refs.timer.getValue();
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
