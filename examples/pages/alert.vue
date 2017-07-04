<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">alert</div>
        <v-button @click.native="click">Show</v-button>
      </div>
    </v-panel>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">confirm</div>
        <v-button @click.native="determine">Show</v-button>
      </div>
    </v-panel>
    <!--<v-dialog ref="dialog" :shown="showDialog" :options="dialogOptions">
            </v-dialog>-->

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
      // potions: 'alert',
      // confirm: 'confirm',
      confirm: {
        title: 'confirm',
        description: 'This is confirm content',
        callback: this.clickConfirm.bind(this),
      },
    };
  },
  methods: {
    click() {
      this.$alert.show(this.potions);
    },
    determine() {
      this.$confirm.show(this.confirm);
      // this.$confirm.show('Hello World');
    },
    clickConfirm() {
      console.debug('callback');
      this.$confirm.hide();
    },
  },
  mounted() {
    this.$confirm.$on('close', () => {
      this.$log('alert close');
    });
    this.$alert.$on('close', () => {
      this.$log('confirm close');
    });
  },
};
</script>

