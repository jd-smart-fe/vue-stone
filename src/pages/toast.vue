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

    methods: {
      showWithIcon() {
        this.$toast.show({
          icon: 'icon-home',
          text: '操作成功',
        });
      },

      showLoading() {
        this.$toast.show({
          icon: 'c-toast-iconloading',
          text: '加载中',
          autohide: false,
        });
      },

      show() {
        this.$toast.show('布谷，布谷。');
      },
    },
  };
</script>

<style>

  @keyframes rotation {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  .c-toast-iconloading {
    background: transparent url(../assets/loading.png);
    width: 30px;
    height: 30px;
    background-size: cover;
    animation: rotation 1s infinite;
  }

</style>
