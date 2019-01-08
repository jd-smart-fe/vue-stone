<template>
  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Action Sheet</div>
        <v-button ref="btn" @click.native="showActionSheet">
          Toggle
        </v-button>
      </div>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Action Box</div>
        <v-button ref="btn" @click.native="shownBox = true">
          Toggle
        </v-button>
      </div>
    </v-panel>

    <v-action-sheet
      :maskCloseable="true"
      ref="action" v-model="shown" :items="items" @change="updateInfo">
    </v-action-sheet>


    <v-action-box
      :maskCloseable="true"
      v-model="shownBox">
      <div style="background: #fff; padding: .1rem 0;">
        <h1 style="margin-top: 0;">自定义内容</h1>
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        <p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>

        <v-button @click.native="shownBox = false">close</v-button>
      </div>
    </v-action-box>
  </div>
</template>

<script>

  export default {
    name: 'Actions',

    data() {
      return {
        shown: false,
        shownBox: false,
        items: [{
          text: '编辑',
        }, {
          text: '删除',
          color: 'red',
        }],
      };
    },

    mounted() {

    },

    methods: {
      showActionSheet() {
        this.shown = true;
      },
      updateInfo(val) {
        if (val === -1) {
          console.log('取消按钮被点击');
        } else {
          console.log(`第${val + 1}个按钮被点击`);
        }
      },
    },
  };
</script>

<style>


</style>
