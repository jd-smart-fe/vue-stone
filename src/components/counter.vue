<template>
  <div class="c-counter" :data-value="value">
    <v-button-group>
      <v-button
      ref="inc"
      class="c-counter-inc"
      icon="v-icon-plus"
      size="large"
      :disabled="incDisabled"
      @touchend.native="incHandle"
      ></v-button>

      <v-button
      ref="dec"
      :class="['c-counter-dec', !disabled ? decDisabled ? 'c-counter-left-border' : '' : '']"
      icon="v-icon-minus"
      size="large"
      :disabled="decDisabled"
      @touchend.native="decHandle"
      ></v-button>
    </v-button-group>
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
      // longTap: {
      //   type: Boolean,
      //   required: false,
      //   default: false,
      // },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
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
      verification(this.value, this.max, this.min);


      if (!this.disabled) {
        this.incDisabled = false;
        this.decDisabled = false;
      } else {
        this.incDisabled = true;
        this.decDisabled = true;
      }
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
        if (this.disabled) return;
        let value = this.value + this.step;
        if (value > this.max) {
          value = this.max;
          return;
        }

        this.$emit('increase', value);
        this.$emit('change', value);
        this.$emit('input', value); // v-model 双向绑定
      },
      decHandle() {
        if (this.disabled) return;
        let value = this.value - this.step;
        if (value < this.min) {
          value = this.min;
          return;
        }

        this.$emit('decrease', value);
        this.$emit('change', value);
        this.$emit('input', value); // v-model 双向绑定
      },
    },
  };
</script>

<style lang="postcss">
  $width: 0.6rem;
  $height: 0.38rem;
  $icon-size: 0.16rem;
  $left-icon-left-margin: 0.04rem;
  $right-icon-right-margin: 0.04rem;


  .c-counter-dec.c-counter-left-border {
    border-left-color: #59B8FC;
  }

  .c-counter button.c-btn-icon-only {
    width: $width;
    height: $height;
    font-size: $icon-size;
  }

  .c-counter-inc .c-btn-icon {
    margin-left: $left-icon-left-margin
  }

  .c-counter-dec .c-btn-icon {
    margin-right: $right-icon-right-margin
  }
</style>
