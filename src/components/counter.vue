<template>
  <div class="c-incDec">
    <v-button
      ref="inc"
      class="c-theme-black c-incDec-inc"
      type="click"
      icon="plus"
      :longTap="true"
      :disabled="incDisabled"
      @change="incHandle"
      ></v-button>
    <v-button
      ref="dec"
      class="c-theme-black c-incDec-dec"
      type="click"
      icon="minus"
      :longTap="true"
      :disabled="decDisabled"
      @change="decHandle"
      ></v-button>
  </div>
</template>

<script>
export default {
  name: 'v-button-incdec',

  data() {
    return {
      hasRange: false,
      number: false,
      incDisabled: false,
      decDisabled: false,
    };
  },

  props: {
    begin: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
  },

  created() {
    // 验证数字区间是否正确
    function verification(begin, max, min) {
      // 没有传入任何参数则返回false，并且不打印错误信息。
      if (max === null && min === null && begin === null) {
        return false;
      }

      if (begin === null) {
        console.error('You must pass a number in begin value');
        return false;
      }

      if (begin > max || begin < min) {
        console.error('The begin number must be between the max value and min value');
        return false;
      }

      // 通过验证 返回 true。
      return true;
    }

    // 验证传入数字是否正确
    verification(this.begin, this.max, this.min);

    // 初始化 初始值 number
    if (typeof begin === 'number') {
      this.number = this.begin;
    }

  },

  watch: {
    number(val) {
      if (this.max !== null && val >= this.max) {
        this.incDisabled = true;
        return;
      }
      if (this.min !== null && val <= this.min) {
        this.decDisabled = true;
        return;
      }

      if (this.incDisabled) {
        this.incDisabled = false;
      }
      if (this.decDisabled) {
        this.decDisabled = false;
      }
    },
  },

  methods: {
    incHandle() {
      this.$emit('increase');
    },
    decHandle() {
      this.$emit('decrease');
    },
  },
};
// width: 206.7;
// height: 69.44;
// + : 22.60

</script>

<style>
  @import '../styles/default-theme/variables.css';
  @import '../styles/mixins.css';

  .c-incDec {

    display: flex;

    width: $incDec-width;
    height: $incDec-height;
    overflow: hidden;

    @mixin border;

    border-color: $gray-lighter;
    border-radius: calc($incDec-height / 2);

    > div{
      width: 50%;
      height: 100%;
      border: none;
      border-radius: 0;
    }

    .c-incDec-inc {
      display: flex;
      justify-content: center;
      align-items: center;

      border-right: 1px solid $gray-lighter;

      i {
        font-style: normal;
      }
    }

    .c-incDec-dec {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-style: normal;
      }
    }

    .is-active {
      background-color: $press-color;
    }
  }

</style>
