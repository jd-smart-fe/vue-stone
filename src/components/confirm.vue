<script>
export default {
  name: 'v-confirm',
  type: 'singleton',
  data() {
    return {
      options: {
        title: '',
        description: '',
        type: 'confirm',
      },
    };
  },
  methods: {
    show(options) {
      if (typeof options === 'string') {
        options = { title: options };
      }
      const btnDefault = {
        buttons: [
        { text: '取消' },
        { text: '确定', callback: options.callback || this.confirm.bind(this) },
        ],
      };
      const obj = Object.assign(this.options, btnDefault, options);
      this.$dialog.show(this.options);
    },
    confirm() {
      this.$log('default config');
      this.hide();
    },
    hide() {
      this.$dialog.hide();
    },
  },
  mounted() {
    this.$dialog.$on('dialog.close', (val) => {
      if (val === 'confirm') {
        this.$emit('close');
      }
    });
  },
};
</script>
