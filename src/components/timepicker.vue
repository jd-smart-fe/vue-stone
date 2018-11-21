<template lang="html">
  <div class="c-timepicker">
     <v-picker class="c-timepicker-col" ref="hourpicker" :items="_items[0]" @change="hourChange">

     </v-picker>
     <v-picker class="c-timepicker-col" ref="mintuespicker" :items="_items[1]" @change="mintuesChange">

     </v-picker>
    <div class="c-timepicker-unit ">
      <span class="c-timepicker-unit-hour">
        <span class="text">时</span></span>

       <span class="c-timepicker-unit-min">
          <span class="text">分</span></span>
         </span>
    </div>
    <div class="c-timepicker-dot">
      <span class="c-timepicker-unit-colon">:</span>
    </div>
  </div>
</template>

<script>
const hourCol = [];
const hourDisplay = [];
for (let i = 0; i <= 23; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  hourDisplay.push(i);
  hourCol.push(n);

}
// 60分钟
const minCol = [];
const minDisplay = [];
for (let i = 0; i <= 59; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  minDisplay.push(i);
  minCol.push(n);
}

export default {
  name: 'v-timepicker',

  data() {
    return {
      chooseHour: this.hour,
      chooseMin: this.min,
      chooseHourActive: this.hour,
      chooseMinActive: this.min,
    };
  },

  computed: {
    _items() {
      const arr = [{
        values: hourCol,
        active: this.hour,
        display: hourDisplay,
      }, {
        values: minCol,
        active: this.min,
        display: minDisplay,
      }];

      return arr;
    },
  },

  props: {
    rotate_effect: {
      type: Boolean,
      default: false,
    },

    hour: {
      default: 0,
    },

    min: {
      default: 0,
    },
  },

  mounted() {
    // this.$refs.picker.$on('change', val => {
    //   this.$emit('change', val);
    // });
    // this.chooseHour = this.hour;
    // this.chooseMin = this.min;
  },

  methods: {
    update(val) {
      this.$refs.picker.update();
    },
    hourChange(val) {
      const arr = {
        value: [val.value, this.chooseMin],
        display: [val.value, this.chooseMin],
        active: [val.active, this.chooseMinActive],
      };
      this.chooseHour = val.value;
      this.chooseHourActive = val.active;
      this.$emit('change', arr);
    },
    mintuesChange(val) {
      const arr = {
        value: [this.chooseHour, val.value],
        display: [this.chooseHour, val.value],
        active: [this.chooseHourActive, val.active],
      };
      this.chooseMin = val.value;
      this.chooseMinActive = val.active;
      this.$emit('change', arr);
    },
  },
};

</script>

<style lang="postcss">

  $fontSize: 16px;
  $height: calc(16px + 14px);
  $colHeight: calc((16px + 14px) * 7);
  .c-timepicker .c-picker-col:nth-of-type(1){
    padding-left: 0.36rem;
  }
  .c-timepicker .c-picker-col:nth-of-type(2){
    padding-right: 0.36rem;
  }
  .c-timepicker{
    position: relative;
    display: flex;
    .c-timepicker-dot{
      position: absolute;
      top: 50%;
      left: 0;

      width: 100%;
      height: 30px;
      margin-top: 1px;

      font-size: calc($fontSize + 2px);
      line-height: 30px;

      transform: translate(0, -55%);
      pointer-events: none;

      .c-timepicker-unit-colon{
        position: absolute;
        left: 0;
        top:50%;
        transform: translateY(-50%);
        right: -0.21rem;
        margin: auto;
        margin-top: -1px;
        width: calc($fontSize + 2px);
        text-align: center;
      }


    }
    .c-timepicker-unit {
      pointer-events: none;
      position: absolute;
      display: flex;
      top: 50%;
      left: 0;
      width: 100%;
      transform: translateY( -50%);
      height: 30px;
      /* text-align: right; */
      .c-timepicker-unit-hour{
        position: relative;
        display: block;
        left:0;
        top:0;
        width: 50%;
        height: 30px;
        .text{
          display: inline-block;
          position: absolute;
          top: 0;
          right:  .5rem;
          line-height: 30px;
        }
      }

      .c-timepicker-unit-min{
        position: relative;
        display: block;
        left:0;
        top:0;
        width: 50%;
        height: 30px;
        .text{
          display: inline-block;
          position: absolute;
          top: 0;
          right:  .5rem;
          line-height: 30px;
        }
      }
    }
  }
 .c-timepicker-col {
   width: 50%;
 }

</style>
