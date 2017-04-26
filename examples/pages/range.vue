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
      <div slot="header" class="c-panel-header row-1 u-cross-center">range - noStep : dots is objects</div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="range"
          v-model="range_data.value"
          :min="range_data.min"
          :max="range_data.max"
          :tooltip="range_data.tooltip"
          :is_step="range_data.isStep"
          :dots="range_data.dots"
        >
        </v-range>
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="rangeNumber"
          v-model="range_data_number.value"
          :min="range_data_number.min"
          :max="range_data_number.max"
          :tooltip="range_data_number.tooltip"
          :is_step="range_data_number.isStep"
          :dots="range_data_number.dots"
        >
        </v-range>
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="rangeJson"
          v-model="range_data_json.value"
          :is_step="range_data_json.isStep"
          :dots="range_data_json.dots"
        >
        </v-range>
      </div>
      <div slot="body" class="c-panel-body">
          range - disabled
      </div>
      <div slot="body" class="c-panel-body row-3 u-cross-center">
        <v-range slot="main" ref="range"
          value="20"
          :dots="range_data.dots"
          :disabled="true"
        >
        </v-range>
      </div>
    </v-panel>

  </div>
</template>

<script>
  export default {
    name: 'range',
    data() {

      return {

        range_data: {
          value: 100,
          min: 0,
          max: 1000,
          tooltip(val) {
            return `${val}°C`;
          },
          dots: [
            {
              icon: 'mode-holiday',
              text: '啊啊',
            },
            {
              icon: 'mode-freeze',
              text: '高温',
            },
          ],
        },
        range_data_number: {
          value: 500,
          min: 0,
          max: 1000,
          tooltip(val) {
            return `当前温度：${val}°C`;
          },
          dots: [
            {
              text: '低温',
            },
            {
              text: '高温',
            },
          ],
        },
        range_data_json: {
          value: {
            value: 30,
            text: '高档',
          },
          isStep: true,
          dots: [
            {
              value: 10,
              text: '低档',
            },
            {
              value: 20,
              text: '中档',
            },
            {
              value: 30,
              text: '高档',
            },
          ],
        },
      };
    },

    mounted() {
      this.$refs.rangeNumber.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.range.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value}`);
      });

      this.$refs.rangeJson.$on('change', (value) => {
        console.log(`当前滑杆的值: ${value.text}`);
      });
    },
  };
</script>

<style>

</style>
