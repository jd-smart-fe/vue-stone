<script>
export default {
  name: 'v-alert',
  type: 'singleton',
  data() {
    return {
      options: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    show(options) {
      if (typeof options === 'string') {
        options = { title: options };
      }
      const obj = Object.assign(this.options, options);
      this.$dialog.show(this.options);
    },
    hide() {
      this.$dialog.hide();
    },
  },
};
</script>
