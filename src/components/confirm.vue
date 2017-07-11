<template>
  <v-dialog ref="dialog" v-model="shown" :title="title" :desc="desc" :buttons="button"></v-dialog>
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
        this.shown = true;
        return;
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
  },
};
</script>
