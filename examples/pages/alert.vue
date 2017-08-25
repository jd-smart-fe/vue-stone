<template>
  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">alert</div>
        <v-button @click.native="alertClick">Show</v-button>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">confirm</div>
        <v-button @click.native="confirmClick">Show</v-button>
      </div>
    </v-panel>

  </div>
</template>
<script>
export default {
  name: 'alert',
  data() {
    return {
      alert: {
        title: '弹窗标题',
        desc: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内。',
        // desc: '弹窗内容',
      },
    };
  },
  methods: {

    alertClick() {
      this.$alert.show(this.alert).then(() => {
        console.log('弹窗关闭了');
      });
    },

    confirmClick() {
      this.$confirm.show({
        // buttons: [
        //  { text: '否', callback: this.noFon.bind(this) },
        //  { text: '是', callback: this.yesFon.bind(this) },
        // ],
        title: '是否删除该定时任务',
        desc: self.error_text,
      }).then(() => {
        // this.onFon();
      }).catch(() => {
        // this.yesFon();
      });
      // this.$confirm.show('弹窗标题').then(() => {
      //   console.log('点击确定');
      // }, () => {
      //   console.log('点击取消');
      // });
    },
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

