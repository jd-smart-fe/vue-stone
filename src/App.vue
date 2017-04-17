<template>
  <div id="app">

    <div class="page-header row-2 home-page-header">
      <div class=""> Stone - Home </div>
    </div>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('button')">
        <div class="c-panel-title"> Buttons </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('range')">
        <div class="c-panel-title"> Range </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('panel')">
        <div class="c-panel-title"> Panel </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('icons')">
        <div class="c-panel-title"> Icon set </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('days-picker')">
        <div class="c-panel-title"> Days Picker </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('modes')">
        <div class="c-panel-title"> Modes </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('slider')">
        <div class="c-panel-title"> Slider </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('timer')">
        <div class="c-panel-title"> Alarm </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('action-sheet')">
        <div class="c-panel-title"> Action Sheet </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('dialog')">
        <div class="c-panel-title"> Dialog </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('form')">
        <div class="c-panel-title"> Form </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('counter')">
        <div class="c-panel-title"> Counter </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('picker')">
        <div class="c-panel-title"> Picker </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('switch')">
        <div class="c-panel-title"> Switch </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('transition')">
        <div class="c-panel-title"> Transition </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('toast')">
        <div class="c-panel-title"> Toast </div>
        <span class='icon icon-pull-right'></span>
      </div>
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
