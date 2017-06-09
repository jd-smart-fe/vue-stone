<template>
  <div :class="['c-dayspicker']">
    <div class="c-dayspicker-quick">
      <!-- <v-button-switch-group :items="quick_list">
      </v-button-group> -->
      <v-button-switch
        v-for="(item, index) in quick_list"
        ref="quick"
        size="small"
        radius="small"
        :value="quick_state_list[index]"
        @touchend.native="quickOnHandle(index)"
      >
      {{ item }}
    </v-button-switch>
    </div>
    <div class="c-dayspicker-body">
      <v-button-switch
        v-for="(item, index) in days_list"
        ref="days"
        size="small"
        radius="small"
        :value="days_state_list[index]"
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

      // change days
      days() {
        this.selected_days = this.days.concat();

        this.days.forEach((val) => {
          this.days_state_list.splice((parseInt(val, 10) - 1), 1, true);
        });

        this.setQuickState(this.days);
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
              this.quick_state_list.splice(ind, 1, true);
            } else {
              this.quick_state_list.splice(ind, 1, false);
            }
          });

          this.days_list.forEach((val, ind) => {
            if (ind >= 5) {
              this.days_state_list.splice(ind, 1, true);
            } else {
              this.days_state_list.splice(ind, 1, false);
            }
          });

        } else if (value.length === 5 && !(value.includes(6) || value.includes(7))) {

          // '工作日'选中
          this.quick_list.forEach((val, ind) => {
            if (ind === 1) {
              this.quick_state_list.splice(ind, 1, true);
            } else {
              this.quick_state_list.splice(ind, 1, false);
            }
          });

          this.days_list.forEach((val, ind) => {
            if (ind >= 5) {
              this.days_state_list.splice(ind, 1, false);
            } else {
              this.days_state_list.splice(ind, 1, true);
            }
          });

        } else if (value.length === 7) {

          // '每天'选中
          this.quick_list.forEach((val, ind) => {
            if (ind === 0) {
              this.quick_state_list.splice(ind, 1, true);
            } else {
              this.quick_state_list.splice(ind, 1, false);
            }
          });

          this.days_list.forEach((val, ind) => {
            this.days_state_list.splice(ind, 1, true);
          });

        } else {

          // 全不选中
          this.quick_list.forEach((val, ind) => {
            this.quick_state_list.splice(ind, 1, false);
          });

          // 如果选择的天数为0
          if (value.length === 0) {

            this.days_list.forEach((val, ind) => {
              this.days_state_list.splice(ind, 1, false);
            });

          } else {

            for (let i = 1; i < 8; i += 1) {
              if (value.indexOf(i) !== -1) {
                this.days_state_list.splice(parseInt((i - 1), 10), 1, true);
              } else {
                this.days_state_list.splice(parseInt((i - 1), 10), 1, false);
              }
            }
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

      daysHandle(index) {
        if (this.days_state_list[index]) {
          this.daysOffHandle(index);
        } else {
          this.daysOnHandle(index);
        }
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
        console.log(thisStatus);
        if (!thisStatus) {
          this.days_list.forEach((val, ind) => {
            this.days_state_list.splice(ind, 1, false);
          });

          this.selected_days = [];
        }
      },
    },
  };
</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';
  $width: 0.46rem;
  $height: 0.22rem;

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
      width: $width;
      height: $height;


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
