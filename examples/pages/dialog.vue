<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Dialog</div>
        <v-button @click.native="click">Show</v-button>
      </div>
    </v-panel>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  data() {
    return {
      test: '',
    };
  },
  methods: {
    click() {
      this.$dialog.show({
        buttons: [
          { text: '确定', callback: this.left.bind(this) },
          { text: '取消', callback: this.right.bind(this) },
        ],
        title: 'JDSmart',
        description: 'No Smart No Goods',
        // style: {
        //   tcolor: 'red',
        //   dcolor: 'pink',
        // },
      });
    },
    left() {
      this.$log('click left button');
      this.$dialog.hide();
    },
    right() {
      this.$log('click right button');
      this.$dialog.hide();
    },
  },
  mounted() {
    this.$dialog.$on('dialog.button.click', (val) => {
      this.$log(`${val}`);
      this.$dialog.hide();
    });
    this.$dialog.$on('dialog.close', () => {
      this.$log('dialog.close');
    });
  },
};
</script>

<style>
.cls{
  color: pink
}
</style>
