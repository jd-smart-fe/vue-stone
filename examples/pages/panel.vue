<template>

  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="header" class="c-panel-header ">
        <div class="c-panel-title">Panel Header with Right Icon</div>
        <div class="c-panel-extra">
          <span class='icon v-icon-mode-smart'></span>
        </div>
      </div>
      <div slot="body" class="c-panel-body">
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>
    </v-panel>

    <v-panel>
      <div slot="header" class="c-panel-header">
        <div class="c-panel-title">Gudo...
          <div class="c-panel-description">description</div>
        </div>
        <span class='icon v-icon-pull-right'></span>
      </div>
    </v-panel>

    <v-panel class="c-custom-panel">
      <div slot="header" class="c-panel-header">
        Custom Panel
      </div>
      <div slot="body" class="c-panel-body">

        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>
      <div slot="footer" class="c-panel-footer "> Panel Footer </div>
    </v-panel>

    <v-panel title="title" description="description" status="status">
      <div slot="body" class="c-panel-body">
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
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

  .c-custom-panel {
    .c-panel-header {
      justify-content: flex-end;
    }
  }
</style>
