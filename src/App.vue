<template>
  <div id="app">

    <v-panel >
      <div slot="body" class="c-panel-body row-2 u-cross-center">
        <div slot="title" class="c-panel-title">Switch: </div>
        <v-switch slot="main" v-model="switch_state" ref="switch"></v-switch>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">Power: </div>
        <v-power slot="main" v-model="power_state" ref="power"></v-power>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">incDec: </div>
        <v-incDec slot="main" ref="incDec"></v-incDec>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">模式</div>
      </div>
      <div slot="body" class="c-panel-body u-without-padding">
        <v-grid :number_per_line="2" :items="grid_data_2"></v-grid>
        <div class="space"></div>
        <v-grid :number_per_line="3" :items="grid_data_3"></v-grid>
        <div class="space"></div>
        <v-grid :number_per_line="4" :items="grid_data_4"></v-grid>
      </div>
    </v-panel>
    <!--<v-mask :shown="shown" ref="mask">
    </v-mask>-->
    <v-modal ref="modal">

    </v-modal>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        grid_data_2: [{
          text: '修改Wifi密码',
          icon: 'mode-holiday',
          id: 1,
        }, {
          text: '黑名单管理',
          icon: 'mode-freeze',
          id: 2,
        }],

        grid_data_3: [{
          text: '标准加热',
          icon: 'mode-holiday',
          id: 1,
        }, {
          text: '半胆加热',
          icon: 'mode-freeze',
          id: 2,
        }, {
          text: '正胆加热',
          icon: 'mode-cool',
          id: 3,
        }],

        grid_data_4: [{
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


        switch_state: true,
        switch_dis_state: false,
        power_state: true,
      };
    },

    mounted() {
      this.$refs.switch.$on('change', (state) => {
        console.log(`设备当前switch状态: ${state}`);
      });

      this.$refs.power.$on('change', (state) => {
        console.log(`设备当前power状态: ${state}`);
      });

      this.$refs.incDec.$on('inc', () => {
        console.log('触发inc事件');
      });

      this.$refs.incDec.$on('dec', () => {
        console.log('触发dec事件');
      });
      this.$refs.modal.$on('leftBtn', () => {
        console.log('触发leftBtn事件');
      });
      this.$refs.modal.$on('rightBtn', () => {
        console.log('触发rightBtn事件');
      });
    },
    methods: {
    },
  };
</script>

<style>

  @import './styles/normalize.css';
  @import './styles/default-theme/variables.css';
  @import './styles/mixins.css';
  @import './styles/utils.css';

  @import './styles/iconfont.css';

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

  /* 废弃代码, 后期可以删除*/
  /*
  .o-panel {
    height: calc($grid-size * 2);

    padding-left: 0.12rem;
    padding-right: 0.12rem;

    font-size: $font-size-lg;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: #fff;

    width: 3.12rem;
    margin: auto;
    box-sizing: border-box;
    border: 1px solid $eee;
    border-radius: 3px;

    &:not(:first-child) {
      margin-top: 10px;
    }

    &.o-panel-lg {
      height: calc($grid-size * 3);
    }
  }
  */


</style>
