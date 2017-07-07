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
      potions: {
        title: 'title',
        description: 'This is alert content',
        buttonText: '确定',
      },
      confirm: {
        title: 'confirm',
        description: 'This is confirm content',
      },
    };
  },
  methods: {

    alertClick() {
      this.$alert.show('啦啦啦').then(() => {
        console.log('弹窗关闭了');
      });
    },

    confirmClick() {
      this.$confirm.show('啦啦啦').then(() => {
        console.log('点击确定');
      }, () => {
        console.log('点击取消');
      });
    },
  },
  mounted() {
    console.log('mounted');
  },
};
</script>

