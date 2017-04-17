<template>

  <div>
    <tmpl-back></tmpl-back>


    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Show Toast</div>
        <v-button ref="btn" @change="toast_show = true">
          Toggle
        </v-button>
      </div>
    </v-panel>

    <v-toast v-model="toast_show" text="gugu..."></v-toast>
  </div>
</template>

<script>

  export default {
    name: 'Form',

    data() {
      return {
        toast_show: false,
      };
    },

    methods: {

    },
  };
</script>

<style>


</style>
