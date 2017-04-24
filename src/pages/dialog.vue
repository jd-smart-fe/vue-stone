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
        showDialog: false,
        dialogOptions: {
          title: '热水器报警',
          description: '热水器过热',
          isModal: true,
          buttons: [
            {
              text: '查看详情',
            },
            {
              text: '我知道了',
            },
          ],
        },
        test: '',
      };
    },

    mounted() {

      // this.$refs.dialog.$on('primaryClick', () => {
      //   console.log('触发primaryClick事件');
      //   this.showDialog = false;

      // });
      // this.$refs.dialog.$on('defaultClick', () => {
      //   console.log('触发 defaultClick 事件');
      //   this.showDialog = false;
      // });
    },

    methods: {

      click() {
        this.$dialog.show({
          buttons: [
            { text: '确定', callback: this.left.bind(this) },
            { text: '取消', callback: this.right.bind(this) },
          ],
          title: 'JDSmart',
          description: 'No Samrt No Good',
        });
      },
      left() {
        this.test = 'l';
        this.$dialog.hide();
        console.log(this.test);
      },
      right() {
        this.test = 'r';
        console.log(this.test);
        this.$dialog.hide();
      },
    },
  };
</script>

<style>


</style>
