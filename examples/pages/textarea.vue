<template>
  <div>
    <div class="page-header row-2 u-cross-center">
      <div class="page-header-left u-cross-center row-2">
        <router-link to="/" class="back-link">
          <span class="icon v-icon-pull-left page-header-icon"></span>返回
        </router-link>
      </div>
    </div>
    <v-panel>
      <div slot="body" class="c-panel-body">
        <v-textarea maxlength="100" showCounter placeholder="请输入" ></v-textarea>
      </div>
    </v-panel>
  </div>
</template>

<script>
  export default {
    name: 'Textarea',

    data() {
      return {
      };
    },
    methods: {
    },
  };
</script>
