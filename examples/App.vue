<template>
  <div id="app">

    <div class="page-header row-2 home-page-header">
      <div class=""> Stone - Home </div>
    </div>

    <v-panel>
      <div slot="header" class="c-panel-header ">
        <div class="c-panel-title">基础组件</div>
        <div class="c-panel-extra">
          <span class='icon v-icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('button')">
        <div > Buttons </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('panel')">
        <div > Panel </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('icons')">
        <div > Icon set </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('slider')">
        <div > Slider </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header ">
        <div class="c-panel-title">表单组件</div>
        <div class="c-panel-extra">
          <span class='icon v-icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('input')">
        <div > Input </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('search')">
        <div > Search </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('textarea')">
        <div > Textarea </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('checkboard')">
        <div > Checkboard </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('switch')">
        <div > Switch </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('range')">
        <div > Range </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('picker')">
        <div > Picker </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('days-picker')">
        <div > Days Picker </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('timepicker')">
        <div > Timepicker </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header ">
        <div class="c-panel-title">操作反馈</div>
        <div class="c-panel-extra">
          <span class='icon v-icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('dialog')">
        <div > Dialog </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('alert')">
        <div > alert </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('toast')">
        <div > Toast </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('action-sheet')">
        <div > Action Sheet </div>
        <span class='icon v-icon-pull-right'></span>
      </div>

    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header ">
        <div class="c-panel-title">其他</div>
        <div class="c-panel-extra">
          <span class='icon v-icon-mode-smart'></span>
        </div>
      </div>
      <!-- <div slot="body" class="c-panel-body u-cross-center" @click="go('transition')">
        <div > Transition </div>
        <span class='icon v-icon-pull-right'></span>
      </div> -->
      <!-- <div slot="body" class="c-panel-body u-cross-center" @click="go('timer')">
        <div > Timer </div>
        <span class='icon v-icon-pull-right'></span>
      </div> -->
      <div slot="body" class="c-panel-body u-cross-center" @click="go('counter')">
        <div > Counter </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('modes')">
        <div > Modes </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('control-center')">
        <div > Control Center </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>

    </v-panel>

    <div style="height: 20px;"></div>
  </div>
</template>

<script>

  export default {
    name: 'app',

    data() {
      return {
      };
    },

    methods: {

      go(hash) {
        this.$router.push(hash);
      },
    },
  };
</script>

<style>

</style>
