<template>
  <div :class="['c-dayspicker']">
    <div class="c-dayspicker-quick">
      <!-- <v-button-group :items="quick_list">
      </v-button-group> -->
      <v-button
        v-for="(item, index) in quick_list"
        ref="quick"
        type="toggle"
        size="small"
        radius="small"
        :init_status="quick_state_list[index]"
        @turnOn="quickOnHandle(index)"
        @touchend.native="quickEndNativeHandle(index)"
        @touchcancel.native="quickEndNativeHandle(index)"
      >
      {{ item }}
      </v-button>
    </div>
    <div class="c-dayspicker-body">
      <v-button
        v-for="(item, index) in days_list"
        ref="days"
        :text="item"
        type="toggle"
        size="small"
        radius="small"
        :init_status="days_state_list[index]"
        @turnOn="daysOnHandle(index)"
        @turnOff="daysOffHandle(index)"
      >
      {{ item }}
      </v-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-dayspicker',
    props: {
      days: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        quick_list: ['每天', '工作日', '周末'],
        days_list: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        quick_state_list: [],
        days_state_list: [],
        selected_days: this.days.concat(),
      };
    },

    created() {

      this.quick_state_list = new Array(this.quick_list.length).fill(false);
      this.days_state_list = new Array(this.days_list.length).fill(false);
      this.days.forEach((val) => {
        this.days_state_list.splice((parseInt(val, 10) - 1), 1, true);

      });
    },

    watch: {
      selected_days() {
        this.$emit('change', this.selected_days);
      },
    },

    mounted() {
      this.setQuickState(this.days);
    },

    methods: {

      setQuickState(value) {

        if ((value.length === 2) && value.includes(6) && value.includes(7)) {

          // '周末'选中
          this.quick_list.forEach((val, ind) => {
            if (ind === 2) {
              this.$refs.quick[ind].update(true);
            } else {
              this.$refs.quick[ind].update(false);
            }
          });

          this.days_list.forEach((val, ind) => {
            if (ind >= 5) {
              this.$refs.days[ind].update(true);
            } else {
              this.$refs.days[ind].update(false);
            }
          });

        } else if (value.length === 5 && !(value.includes(6) || value.includes(7))) {

          // '工作日'选中
          this.quick_list.forEach((val, ind) => {
            if (ind === 1) {
              this.$refs.quick[ind].update(true);
            } else {
              this.$refs.quick[ind].update(false);
            }
          });

          this.days_list.forEach((val, ind) => {
            if (ind >= 5) {
              this.$refs.days[ind].update(false);
            } else {
              this.$refs.days[ind].update(true);
            }
          });

        } else if (value.length === 7) {

          // '每天'选中
          this.quick_list.forEach((val, ind) => {
            if (ind === 0) {
              this.$refs.quick[ind].update(true);
            } else {
              this.$refs.quick[ind].update(false);
            }
          });

          this.days_list.forEach((val, ind) => {

            this.$refs.days[ind].update(true);
          });

        } else {

          // 全不选中
          this.quick_list.forEach((val, ind) => {

            this.$refs.quick[ind].update(false);
          });

          // 如果选择的天数为0
          if (value.length === 0) {

            this.days_list.forEach((val, ind) => {
              this.$refs.days[ind].update(false);
            });

          } else {
            value.forEach((val) => {
              this.$refs.days[parseInt((val - 1), 10)].update(true);
            });
          }

        }

      },

      quickOnHandle(index) {

        let isSame = false;

        switch (index) {
          case 0:

            if (this.selected_days.toString() === [1, 2, 3, 4, 5, 6, 7].toString()) {
              isSame = true;
              break;
            }

            this.selected_days = [1, 2, 3, 4, 5, 6, 7];
            break;

          case 1:

            if (this.selected_days.toString() === [1, 2, 3, 4, 5].toString()) {
              isSame = true;
              break;
            }

            this.selected_days = [1, 2, 3, 4, 5];
            break;

          case 2:
            if (this.selected_days.toString() === [6, 7].toString()) {
              isSame = true;
              break;
            }

            this.selected_days = [6, 7];
            break;

          default:
            break;
        }

        // 防止在点击days按钮时 执行两次 this.setQuickState方法;
        if (isSame) {
          return;
        }

        this.setQuickState(this.selected_days);

        // this.$emit('change', this.selected_days);
      },

      daysOnHandle(index) {

        const currVal = index + 1;
        // 判断this.selected_days里是否存在
        const has = this.selected_days.findIndex((val) => val === currVal);
        if (has >= 0) {
          return;
        }

        this.selected_days.push(currVal);
        this.selected_days.sort();
        this.setQuickState(this.selected_days);
        // this.$emit('input', this.selected_days);

      },

      daysOffHandle(index) {

        const offVal = index + 1;
        const offValIndex = this.selected_days.findIndex((val) => val === offVal);

        if (offValIndex >= 0) {
          this.selected_days.splice(offValIndex, 1);
          this.selected_days.sort();
          this.setQuickState(this.selected_days);
        }

      },

      quickEndNativeHandle(index) {

        const thisStatus = this.$refs.quick[index].status;

        if (!thisStatus) {
          this.days_list.forEach((val, ind) => {
            this.$refs.days[ind].update(false);
          });

          this.selected_days = [];
          // this.$emit('change', this.selected_days);
        }
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
      margin-left:0.15rem;
      float:left;

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
    border-bottom:#e5e5e5 solid 1px;
    overflow:hidden;
    margin-left: -0.15rem;
  }
  .c-dayspicker-body{
    width:100%;
    padding:0 0 $dayspicker-padding-y 0;
    overflow:hidden;
    margin-left: -0.15rem;

    .c-btn{
      margin-top:$dayspicker-padding-y;
    }
  }
</style>
