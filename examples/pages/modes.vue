<template>
  <div>

    <div class="page-header row-2 u-cross-center">
      <div class="page-header-left u-cross-center row-2">
        <router-link to="/" class="back-link">
          <span class="icon icon-pull-left page-header-icon"></span>返回
        </router-link>
      </div>
    </div>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">模式设置</div>
      </div>
      <div slot="body" class="c-panel-body u-without-padding">

        <!--  <v-modes v-model="gridActiveId" ref="modes"
          :numberal="2" more="更多设置" :items="gridData2"
        ></v-modes>
        <div class="space"></div> -->

        <v-modes v-model="gridActiveId" ref="modes"
          :numberal="3" more="更多设置" :items="gridData3"
        ></v-modes>
        <div class="space"></div>

        <!--
        <v-modes v-model="gridActiveId" ref="modes"
          :numberal="4"  :items="gridData4"></v-modes>
        -->
      </div>
    </v-panel>
  </div>
</template>

<script>

  export default {
    name: 'Modes',

    data() {
      return {
        gridActiveId: 2,
        gridData2: [{
          text: '修改Wifi密码',
          icon: 'mode-holiday',
          id: 1,
        }, {
          text: '黑名单管理',
          icon: 'mode-freeze',
          id: 2,
        }, {
          text: '修改Wifi密码',
          icon: 'mode-holiday',
          id: 3,
        }, {
          text: '黑名单管理',
          icon: 'mode-freeze',
          id: 4,
        }],

        gridData3: [{
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
        }, {
          text: '上下加热',
          icon: 'mode-holiday',
          id: 4,
        }, {
          text: '奇葩加热',
          icon: 'mode-freeze',
          id: 5,
        }, {
          text: '无敌加热',
          icon: 'mode-cool',
          id: 6,
        }],

        gridData4: [{
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
      };
    },

    mounted() {
      this.$refs.modes.$on('change', (state) => {
        console.log(`设备当前所选模式id: ${state}`);
      });
    },

    methods: {
    },
  };
</script>

<style>


</style>
