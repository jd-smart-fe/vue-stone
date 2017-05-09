<template>
  <div>
    <tmpl-back></tmpl-back>
    <v-panel>
      <div slot="body" class="c-panel-body u-cross-center">
        <div class="">alert</div>
        <v-button @click.native="click">Show</v-button>
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
        title: 'alert',
        // buttons: [
        //   {
        //     text: 'ok',
        //     callback: this.ok.bind(this),
        //   },
        // ],
      },
      // potions: 'alert',
    };
  },
  methods: {
    click() {
      this.$alert.show(this.potions);
    },
    ok() {
      this.$log('click ok');
      this.$alert.hide();
    },
  },
};
</script>

