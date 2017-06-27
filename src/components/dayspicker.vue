<template>
  <div :class="['c-dayspicker']">
    <div class="c-dayspicker-quick">
      <!-- <v-button-switch-group :items="quick_list">
      </v-button-group> -->
      <v-button-switch
        v-for="(item, index) in quickList"
        :key="index"
        ref="quick"
        size="small"
        radius="small"
        :hold="true"
        :value="index === quickListValue"
        @touchend.native="quickOnHandle(index)"
      >
      {{ item }}
      </v-button-switch>
    </div>

    <div class="c-dayspicker-line"></div>

    <div class="c-dayspicker-body">
      <v-button-switch
        v-for="(item, index) in daysList"
        :key="index"
        size="small"
        radius="small"
        :hold="true"
        :value="1 === daysValueForArray[index]"
        @change="daysHandle(index)"
      >
      {{ item }}
    </v-button-switch>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-dayspicker',

    props: {
      // 保留旧有的 api
      days: {
        type: Array,
        default() {
          return null;
        },
      },

      // 新的双向绑定的
      value: {
        type: Array,
        default() {
          return [];
        },
      },
    },

    data() {
      return {
        quickList: ['每天', '工作日', '周末'],
        daysList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        selectedDays: this.value,
      };
    },

    created() {
      // 兼容旧 api
      if (this.value === [] && this.days !== null) {
        this.selectedDays = this.days;
      }
    },

    computed: {
      daysValueForArray() {
        const arr = [];
        arr.length = 7;
        arr.fill(0);

        this.selectedDays.forEach(item => {
          arr[item - 1] = 1;
        });

        return arr;
      },

      quickListValue() {
        const selectedDays = this.selectedDays.toString();
        switch (selectedDays) {
          case [1, 2, 3, 4, 5, 6, 7].toString():
            return 0;

          case [1, 2, 3, 4, 5].toString():
            return 1;

          case [6, 7].toString():
            return 2;

          default:
            return -1;
        }
      },
    },

    watch: {
      days(val) {
        this.selectedDays = val;
      },

      value(val) {
        this.selectedDays = val;
      },

      selectedDays(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      },
    },

    mounted() {
    },

    methods: {
      quickOnHandle(index) {

        // 每天
        if (index === 0) {

          if (this.selectedDays.toString() === [1, 2, 3, 4, 5, 6, 7].toString()) {
            this.selectedDays = [];
            return;
          }

          this.selectedDays = [1, 2, 3, 4, 5, 6, 7];
          return;
        }

        // 工作日
        if (index === 1) {

          if (this.selectedDays.toString() === [1, 2, 3, 4, 5].toString()) {
            this.selectedDays = [];
            return;
          }

          this.selectedDays = [1, 2, 3, 4, 5];
          return;
        }

        // 周末
        if (index === 2) {
          if (this.selectedDays.toString() === [6, 7].toString()) {
            this.selectedDays = [];
            return;
          }

          this.selectedDays = [6, 7];
          return;
        }
      },

      daysHandle(index) {
        const dayIndex = index + 1;
        const chooseIndex = this.selectedDays.indexOf(dayIndex);

        if (chooseIndex !== -1) {
          this.selectedDays.splice(chooseIndex, 1);

        } else {
          this.selectedDays = this.sortArray(this.selectedDays.concat([dayIndex]));
        }
      },

      sortArray(arr) {
        return arr.sort((a, b) => a - b);
      },
    },
  };
</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-dayspicker{
    .c-btn{
      /*line-height:$dayspicker-item-height;*/
      font-size: $t-dayspicker-font-size;
      text-align:center;
      @mixin border;
      border-color: $t-dayspicker-defcolor;
      color: $t-dayspicker-defcolor;
      box-sizing: border-box;
      margin-left:0.1rem;
      float:left;
      padding: 0;
      width: $dayspicker-item-width;
      height: $dayspicker-item-height;


      &.c-btn-base{
        width: $dayspicker-item-width;
        height: $dayspicker-item-height;
        border-radius: $dayspicker-item-radius;
      }

      &.c-btn-on{
        color: $t-dayspicker-lightcolor;
        border-color: $t-dayspicker-lightcolor;
        background: none;
      }
    }
  }
  .c-dayspicker-quick{
    padding:$dayspicker-padding-y 0;
    overflow:hidden;
    margin-left: -0.1rem;
  }
  .c-dayspicker-body{
    padding:0 0 $dayspicker-padding-y 0;
    overflow:hidden;
    margin-left: -0.1rem;

    .c-btn{
      margin-top:$dayspicker-padding-y;
    }
  }
  .c-dayspicker-line {
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
  }
</style>
