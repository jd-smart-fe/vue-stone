<template>
  <div class="c-counter" :data-value="value">
    <v-button
      ref="inc"
      class="c-counter-inc"
      disabledClass="c-counter-disabled"
      type="click"
      icon="plus"
      :longTap="true"
      :disabled="incDisabled"
      @change="incHandle"
      ></v-button>
    <v-button
      ref="dec"
      class="c-counter-dec"
      type="click"
      disabledClass="c-counter-disabled"
      icon="minus"
      :longTap="true"
      :disabled="decDisabled"
      @change="decHandle"
      ></v-button>
  </div>
</template>

<script>
export default {
  name: 'v-counter',

  data() {
    return {
      incDisabled: false,
      decDisabled: false,
    };
  },

  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    step: {
      type: Number,
      required: false,
      default: 1,
    },
  },

  created() {
    // 验证数字区间是否正确
    function verification(current, max, min) {
      if (current > max || current < min) {
        console.error('The current number must be between the max value and min value');
        return false;
      }

      // 通过验证 返回 true。
      return true;
    }

    // 验证传入数字是否正确
    verification(this.current, this.max, this.min);

    if (this.value >= this.max) {
      this.incDisabled = true;
    }
    if (this.value <= this.min) {
      this.decDisabled = true;
    }
  },

  watch: {
    value(val) {
      if (val >= this.max) {
        this.incDisabled = true;
        return;
      }
      if (val <= this.min) {
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
      let value = this.value + this.step;
      if (value >= this.max) {
        value = this.max;
      }

      this.$emit('increase', value);
      this.$emit('change', value);
      this.$emit('input', value);
    },
    decHandle() {
      let value = this.value - this.step;
      if (value <= this.min) {
        value = this.min;
      }

      this.$emit('decrease', value);
      this.$emit('change', value);
      this.$emit('input', value);
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

  .c-counter {

    display: flex;

    width: $counter-width;
    height: $counter-height;
    overflow: hidden;

    @mixin border;

    border-color: $gray-lighter;
    border-radius: calc($counter-height / 2);

    > .c-btn{
      width: 50%;
      height: 100%;
      border: none;
      border-radius: 0;
      color: $gray;
    }

    .c-counter-inc {
      display: flex;
      justify-content: center;
      align-items: center;

      border-right: 1px solid $gray-lighter;

      i {
        font-style: normal;
      }
    }

    .c-counter-dec {
      display: flex;
      justify-content: center;
      align-items: center;

      i {
        font-style: normal;
      }
    }
    
    .c-counter-disabled{
      color: $btn-disabled;
    }
  }

</style>
