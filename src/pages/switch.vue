<template>

  <div>
    <tmpl-back></tmpl-back>
    <v-panel >
      <div slot="body" class="c-panel-body u-cross-center">
        <div slot="title" class="c-panel-title">Switch: </div>
        <v-switch slot="main" v-model="switch_state" ref="switch"></v-switch>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <div slot="title" class="c-panel-title ">Power: </div>
        <v-power slot="main" ref="power" :hold="true" v-model="power_state"></v-power>
      </div>
    </v-panel>
  </div>
</template>

<script>

  export default {
    name: 'Switch',

    data() {
      return {
        switch_state: true,
        power_state: true,
      };
    },

    mounted() {
      this.$refs.switch.$on('change', (state) => {
        console.log(`设备当前switch状态: ${state}`);
      });

      this.$refs.power.$on('change', (state) => {
        this.power_state = !this.power_state;
        console.log(`设备当前power状态: ${state}`);
      });

    },

    methods: {
    },
  };
</script>

<style>


</style>
