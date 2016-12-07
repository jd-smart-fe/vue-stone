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
        <v-grid :number_per_line="4" :items="grid_data"></v-grid>
      </div>
    </v-panel>


  </div>
</template>

<script>

  export default {

    data() {
      return {
        grid_data: [{
          text: '标准加热',
          id: 1,
        }, {
          text: '半胆加热',
          id: 2,
        }, {
          text: '正胆加热',
          id: 3,
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
