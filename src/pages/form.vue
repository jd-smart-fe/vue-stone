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
      <div slot="body" class="c-panel-body">
        <v-input ref="input" v-model="message" placeholder="未输入时提示内容"></v-input>
      </div>
    </v-panel>
  </div>
</template>

<script>

  export default {
    name: 'Form',

    data() {
      return {
        message: '',
      };
    },

    methods: {
    },
  };
</script>

<style>


</style>
