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
      // potions: {
      //   title: 'alert',
      //   buttonText: 'ok',
      // },
      potions: 'alert',
    };
  },
  methods: {
    click() {
      this.$alert.show(this.potions);
    },
  },
  mounted() {
    this.$dialog.$on('dialog.close', () => {
      this.$log('alert close');
    });
  },
};
</script>

