<template>
  <div class="c-counter" :data-value="value">
    <v-button-group>
      <v-button
      ref="inc"
      class="c-counter-inc"
      icon="plus"
      size="large"
      :disabled="incDisabled"
      @touchend.native="incHandle"
      ></v-button>

      <v-button
      ref="dec"
      :class="['c-counter-dec', decDisabled ? 'c-counter-left-border' : '']"
      icon="minus"
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
    longTap: {
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
</script>

<style>
.c-counter-dec.c-counter-left-border {
  border-left-color: #59B8FC;
}
</style>
