<template lang="html">
  <div class="c-timepicker">
    <v-picker :items="_items" ref="picker" :rotate_effect="rotate_effect"></v-picker>
    <div class="c-timepicker-unit">
      <span class="c-timepicker-unit-hour">时</span>
      <span class="c-timepicker-unit-colon">:</span>
      <span class="c-timepicker-unit-min">分</span>
    </div>
  </div>
</template>

<script>
const hourCol = [];
for (let i = 0; i <= 23; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  hourCol.push(n);
}
// 60分钟
const minCol = [];
for (let i = 0; i <= 59; i += 1) {
  let n = 0;
  if (i < 10) {
    n = `0${i}`;
  } else {
    n = i;
  }
  minCol.push(n);
}

const hourActive = new Date().getHours();
const minActive = new Date().getMinutes();

export default {
  name: 'v-timepicker',

  data() {
    return {
    };
  },

  computed: {
    _items() {
      const arr = [{
        values: hourCol,
        active: this.hour,
      }, {
        values: minCol,
        active: this.min,
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
      default: hourActive,
    },

    min: {
      default: minActive,
    },
  },

  mounted() {
    this.$refs.picker.$on('change', val => {
      this.$emit('change', val);
    });
  },

  methods: {
    update() {
      this.$refs.picker.update();
    },
  },
};

</script>

<style lang="css">

  $fontSize: 16px;
  $height: calc(16px + 14px);
  $colHeight: calc((16px + 14px) * 7);

  .c-timepicker{
    position: relative;

    .c-timepicker-unit{
      position: absolute;
      top: 50%;
      width: 100%;
      height: $fontSize;
      transform: translate(0, -55%);
      left: 0;
      font-size: calc($fontSize + 2px);
      pointer-events: none;
      .c-timepicker-unit-colon{
        position: absolute;
        left: 0;
        right: -0.21rem;
        margin: auto;
        margin-top: -1px;
        width: calc($fontSize + 2px);
        text-align: center;
      }

      .c-timepicker-unit-hour{
        position: absolute;
        left: -0.68rem;
        right: 0;
        margin: auto;
        width: calc($fontSize + 2px);
        text-align: center;
      }

      .c-timepicker-unit-min{
        position: absolute;
        left: 0;
        right: -1.60rem;
        margin: auto;
        width: calc($fontSize + 2px);
        text-align: center;
      }
    }
  }


</style>
