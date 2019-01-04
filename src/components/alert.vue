<template>
  <v-dialog ref="dialog" v-model="shown" :title="title" :desc="desc" :buttons="button"
  :maskCloseable="maskCloseable"
  @maskclick="closeAlert"></v-dialog>
</template>


<script>
export default {
  name: 'v-alert',

  type: 'singleton',

  data() {
    return {
      title: '提示',
      desc: '',
      shown: false,
      button: [{ text: '确定' }],
      inited: false,
      promise: [],
    };
  },
  props: {
    maskCloseable: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
    shown(val) {
      if (val === false) {
        this.$emit('hide');
        return;
      }
      this.$emit('show');
    },
  },

  methods: {

    hide() {
      this.shown = false;
    },
    closeAlert() {
      if (this.maskCloseable) {
        this.shown = false;
      }
    },
    show(options) {
      this.init();

      return new Promise((resolve, reject) => {

        this.$refs.dialog.$on('buttonfirst', () => {
          this.$refs.dialog.$off('buttonfirst');
          resolve();
        });

        if (typeof options === 'string') {
          this.title = options;
          this.desc = '';
          this.shown = true;
          return;
        }

        this.title = options.title;
        this.desc = options.desc;

        const button = {};
        let buttonNoChange = true;

        if (Object.prototype.hasOwnProperty.call(options, 'buttonText')) {
          button.text = options.buttonText;
          buttonNoChange = false;
        } else {
          button.text = '确定';
        }

        if (Object.prototype.hasOwnProperty.call(options, 'buttonColor')) {
          buttonNoChange = false;
          button.color = options.buttonColor;
        }

        if (!buttonNoChange) {
          this.button = button;
        }

        this.shown = true;
      });


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
