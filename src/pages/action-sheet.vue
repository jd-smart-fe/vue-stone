<template>
  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Action Sheet</div>
        <v-button ref="btn" @change="showActionSheet">
          Toggle
        </v-button>
      </div>
    </v-panel>

    <v-actions
      ref="actions" v-model="shown" :items="items" @change="updateInfo"></v-actions>
  </div>
</template>

<script>

  export default {
    name: 'Actions',

    data() {
      return {
        shown: false,
        items: [{
          text: '编辑',
        }, {
          text: '删除',
          color: 'red',
        }],
      };
    },

    mounted() {},

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
