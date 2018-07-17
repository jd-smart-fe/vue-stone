<template>
  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div>Toast</div>
        <v-button ref="btn" @click.native="show"> Show </v-button>
      </div>

      <div slot="body" class="c-panel-body u-cross-center">
        <div>Toast With Icon</div>
        <v-button ref="btn" @click.native="showWithIcon"> Show </v-button>
      </div>

      <div slot="body" class="c-panel-body u-cross-center">
        <div>Loading</div>
        <v-button ref="btn" @click.native="showLoading"> Show </v-button>
      </div>

    </v-panel>
  </div>
</template>

<script>

export default {
  name: 'Toast',

  data() {
    return {
      toast_show: false,
    };
  },

  mounted() {
    this.$toast.show({
      icon: 'v-icon-home',
      text: '操作成功',
      duration: 2000,
      autohide: false,
    });

    setTimeout(() => {
      this.$toast.hide();
    }, 2000);
  },

  methods: {
    showWithIcon() {
      this.$toast.show({
        icon: 'v-icon-home',
        text: '操作成功',
        duration: 2000,
      });
    },

    showLoading() {

      this.$loading.show({ modal: true, text: '正在控制' });
      setTimeout(() => {
        this.$loading.hide();
      }, 3000);
    },

    hideLoading() {
      this.$loading.hide();
    },

    show() {
      this.$toast.show('布谷，布谷。');
    },
  },
};
</script>

<style>

</style>
