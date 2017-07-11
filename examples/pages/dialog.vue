<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Noraml Dialog</div>
        <v-button @click.native="click(1)">Show</v-button>
      </div>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Only Title Dialog</div>
        <v-button @click.native="click(2)">Show</v-button>
      </div>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">Slot Area Dialog</div>
        <v-button @click.native="click(3)">Show</v-button>
      </div>
    </v-panel>
    <v-dialog ref="dialog1" v-model="dialogShown1" title="提示" :desc="desc"></v-dialog>
    <v-dialog ref="dialog2" v-model="dialogShown2" title="天干物燥，小心火烛！"></v-dialog>
    <v-dialog ref="dialog3" v-model="dialogShown3" title="TITLE" desc="">
      <div class="dialog-slot">There is slot area</div>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'Dialog',
  data() {
    return {
      test: '',
      dialogShown1: false,
      dialogShown2: false,
      dialogShown3: false,
      desc: 'This is content',
    };
  },
  methods: {
    click(index) {
      this[`dialogShown${index}`] = !this[`dialogShown${index}`];
    },
  },
  mounted() {
    this.$refs.dialog1.$on('buttonfirst', () => {
      this.dialogShown1 = false;
    });
    this.$refs.dialog2.$on('buttonfirst', () => {
      this.dialogShown2 = false;
    });
    this.$refs.dialog3.$on('buttonfirst', () => {
      this.dialogShown3 = false;
    });
  },
};
</script>

<style>
.dialog-slot {
  display: flex;
  align-items: center;
  justify-content: center;

  background: blueviolet;

  font-size: 18px;
  color: whitesmoke;
  height: 100px;
}
</style>
