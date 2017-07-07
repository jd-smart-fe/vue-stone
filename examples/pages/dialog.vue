<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Dialog</div>
        <v-button @click.native="click">Show</v-button>
      </div>
    </v-panel>
    <v-dialog ref="dialog" v-model="dialogShown" :desc="desc"></v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  data() {
    return {
      test: '',
      dialogShown: false,
      desc: 'This is content',
    };
  },
  methods: {
    click() {
      this.dialogShown = !this.dialogShown;
    },
  },
  mounted() {
    this.$refs.dialog.$on('buttonfirst', () => {
      this.dialogShown = false;
    });
  },
};
</script>

<style>
</style>
