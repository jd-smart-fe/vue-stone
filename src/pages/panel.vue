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
        <div class="c-panel-title">Panel Header with Right Icon</div>
        <div class="c-panel-extra">
          <span class='icon icon-mode-smart'></span>
        </div>
      </div>

      <div slot="body" class="c-panel-body">
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header u-cross-center">
        <div class="c-panel-title">Panel Header</div>
      </div>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="c-panel-title">Gudo...
          <div class="c-panel-description">description</div>
        </div>
        <span class='icon icon-pull-right'></span>
      </div>
    </v-panel>

  </div>
</template>

<script>

  export default {
    name: 'Panel',

    data() {
      return {
      };
    },

    methods: {
    },
  };
</script>

<style>


</style>
