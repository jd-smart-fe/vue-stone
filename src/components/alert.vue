<script>
export default {
  name: 'v-alert',
  type: 'singleton',
  data() {
    return {
      options: {
        title: '',
        description: '',
        type: 'alert',
      },
    };
  },
  methods: {
    show(options) {
      if (typeof options === 'string') {
        options = { title: options };
      }
      const a = { button: [{ text: options.buttonText || '确定' }] };
      const obj = Object.assign(this.options, options);
      this.$dialog.show(this.options);
    },
    hide() {
      this.$dialog.hide();
    },
  },

};
</script>
