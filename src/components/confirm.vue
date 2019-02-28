<template>
  <div class="c-confirm">
    <v-dialog
      ref="dialog"
      v-model="shown"
      :title="title"
      :desc="desc"
      :buttons="button"
    ></v-dialog>
  </div>
</template>

<script>
export default {
  name: 'v-confirm',
  type: 'singleton',
  data() {
    return {
      shown: false,
      title: '提示',
      desc: '',
      button: [{ text: '取消' }, { text: '确定' }],
      inited: false,
      resolve: [],
      reject: [],
    };
  },

  methods: {
    show(options) {
      return new Promise((resolve, reject) => {
        this.showDialog(options);

        this.$refs.dialog.$on('buttonfirst', () => {
          this.$refs.dialog.$off('buttonfirst');
          this.$refs.dialog.$off('buttonsecond');
          reject();
        });

        this.$refs.dialog.$on('buttonsecond', () => {
          this.$refs.dialog.$off('buttonfirst');
          this.$refs.dialog.$off('buttonsecond');
          resolve();
        });
      });
    },

    hide() {
      this.shown = false;
    },

    showDialog(options) {
      this.init();

      if (typeof options === 'string') {
        this.title = options;
        this.desc = '';
      } else {
        this.title = options.title || this.title;
        this.desc = options.desc || this.desc;
        this.button = options.button || this.button;
      }

      this.shown = true;
    },

    init() {
      if (this.inited) {
        return;
      }
      this.inited = true;
      document.body.appendChild(this.$el);
    },
    destroy() {
      document.body.removeChild(this.$el);
      this.inited = false;
    },
  },
};
</script>

<style lang="postcss">
.c-confirm{

}
</style>
