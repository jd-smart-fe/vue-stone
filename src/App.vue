<template>
  <div id="app">

    <v-panel>
      <div slot="title" class="c-panel-title">Switch: </div>
      <v-switch slot="main" :disabled="false" :state="state" ref="switch"></v-switch>
    </v-panel>

    <v-panel cls="c-panel-lg">
      <div slot="title" class="c-panel-title">Power: </div>
      <v-power slot="main" v-model="pstate" ref="power"></v-power>
    </v-panel>

    <v-panel>
      <div slot="title" class="c-panel-title">Switch2: </div>
      <v-switch slot="main" :state="state2" ></v-switch>
    </v-panel>
  </div>
</template>

<script>

  export default {

    data() {
      return {
        disabled: true,
        state: 'on',
        state2: 'off',

        pstate: true,
      };
    },

    mounted() {
      this.$refs.switch.$on('change', (state) => {
        this.state = state;
      });
    },
  };
</script>

<style>

  @import './styles/normalize.css';
  @import './styles/default-theme/variables.css';

  body {
    font-size: $font-size-base;
    background-color: #efefef;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
