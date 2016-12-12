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
      default: false,
      validator(val) {
        if (typeof val === 'number' || val === false) {
          return true;
        }
        console.error('please pass a number');
        return false;
      },
    },
    max: {
      required: false,
      default: false,
      validator(val) {
        if (typeof val === 'number' || val === false) {
          return true;
        }
        console.error('please pass a number');
        return false;
      },
    },
    min: {
      required: false,
      default: false,
      validator(val) {
        if (typeof val === 'number' || val === false) {
          return true;
        }
        console.error('please pass a number');
        return false;
      },
    },
  },

  created() {
    // 验证传入数字是否正确
    if (this.max || this.min) {
      if (this.begin) {
        if (this.begin <= this.max && this.begin >= this.min) {
          // return true;
        }
        console.error('The begin number must be between the max value and min value');
        this.begin = false;
        // return false;
      }

      console.error('You must pass a number in begin value');
      this.begin = false;
      // return false;
    }


    // 初始化 初始值 number
    if (typeof begin === 'number') {
      this.number = this.begin;
    }
  },

  watch: {
    number(val) {
      if (this.max !== false && val >= this.max) {
        this.incDisabled = true;
      }
      if (this.min !== false && val >= this.min) {
        this.decDisabled = true;
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

<style scoped>
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
