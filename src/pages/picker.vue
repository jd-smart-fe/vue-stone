<template>

  <div>
    <tmpl-back></tmpl-back>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div class="">Picker</div>
        <v-button ref="btn_actions" text="Toggle" @change="toggle"></v-button>
      </div>
    </v-panel>

    <v-panel>
      <div slot="body" class="c-panel-body row-1 u-cross-center">
        <div id='picker_value' class="picker-value-wrapper">
          {{ picker_value }}
        </div>
      </div>
    </v-panel>

    <v-picker ref="picker" :unit="picker_unit"
      :head_direction="head_direction" :display="picker_display"
      :shown="shown" :items="picker_items" :rotate_effect="false"
      @change="pickerHandle"
      >
    </v-picker>

  </div>
</template>

<script>

  export default {
    name: 'Picker',

    data() {
      return {
        head_direction: 'title',
        shown: false,
                // picker setting
        picker_value: [],
        picker_display: 'modal',
        picker_unit: ['时', '分', '秒'],
        picker_items: [{
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          displayValues: [120000000000, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          active: 1,
        }, {
          values: ['la', 'da', 'fa', 'ca'],
          displayValues: ['啊', '掰', '猜', '呆'],
          active: 1,
        }, {
                    values: ['la', 'da', 'fa', 'ca'],
          displayValues: ['啊', '掰', '猜', '呆'],
          active: 1,

        }],
      };
    },

    mounted() {

      this.$refs.picker.$on('select', (val) => {
        this.shown = false;
        console.log(val);
      });
    },

    methods: {
      toggle() {
        this.shown = !this.shown;
      },
      pickerHandle(val) {
        console.log(val);
        this.picker_value = val;
      },

    },
  };
</script>

<style>
  .picker-value-wrapper {
    text-align: center;
  }
</style>
