<template>

  <div>
    <div class="page-header row-2 u-cross-center">
      <div class="page-header-left u-cross-center row-2">
        <router-link to="/" class="back-link">
          <span class="icon icon-pull-left page-header-icon"></span>返回
        </router-link>
      </div>
    </div>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Show/Hide Dialog</div>
        <v-button text="actions" @change="click"></v-button>
      </div>
    </v-panel>

    <v-dialog ref="dialog" :showDialog="showDialog" :options="dialogOptions">
    </v-dialog>

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
              /*callback() {
                console.log('传递方法调用');
                console.log(this);
              },*/
            },
            {
              text: '我知道了',
              /*callback() {
                console.log('传递方法调用');
              },*/
            },
          ],
        },

      };
    },

    mounted() {

      this.$refs.dialog.$on('primaryClick', () => {
        console.log('触发primaryClick事件');
        this.showDialog = false;

      });
      this.$refs.dialog.$on('defaultClick', () => {
        console.log('触发 defaultClick 事件');
        this.showDialog = false;
      });

      // this.$refs.dialog.$on('maskClick', () => {
      //   console.log('maskClick');
      //   this.showDialog = false;
      // });
    },

    methods: {

      click() {
        this.showDialog = true;
      },
    },
  };
</script>

<style>


</style>
