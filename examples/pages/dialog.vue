<template>

  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Dialog</div>
        <v-button @click.native="click">Show</v-button>
      </div>
    </v-panel>

    <!--<v-dialog ref="dialog" :shown="showDialog" :options="dialogOptions">
    </v-dialog>-->

  </div>
</template>
<script>
  export default {
    name: 'Dialog',
    data() {
      return {
      };
    },
    methods: {
      click() {
        this.$dialog.show({
          buttons: [
            { text: '确定', callback: this.left.bind(this) },
            // { text: '取消', callback: this.right.bind(this) },
          ],
          title: 'JDSmart',
          description: 'No Smart No Goods',
        });
      },
      left() {
        this.$log('左按钮');
        this.$dialog.hide();
      },
      right() {
        this.$log('右按钮');
        this.$dialog.hide();
      },
    },
  };
</script>

<style>


</style>
