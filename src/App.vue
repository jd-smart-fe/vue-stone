<template>
  <div id="app">

    <div class="page-header row-2 home-page-header">
      <div class=""> Stone - Home </div>
    </div>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('button')">
        <div > Buttons </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('range')">
        <div > Range </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('panel')">
        <div > Panel </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('icons')">
        <div > Icon set </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('days-picker')">
        <div > Days Picker </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('modes')">
        <div > Modes </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('slider')">
        <div > Slider </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('timer')">
        <div > Alarm </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('action-sheet')">
        <div > Action Sheet </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('dialog')">
        <div > Dialog </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('form')">
        <div > Form </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('counter')">
        <div > Counter </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('picker')">
        <div > Picker </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('switch')">
        <div > Switch </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('transition')">
        <div > Transition </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center" @click="go('toast')">
        <div > Toast </div>
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
